import { Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const {
      items, // array of { productId, quantity }
      shippingAddress,
      paymentMethod,
      paymentId,
      couponCode,
      giftCardCode,
      redeemPoints, // number of loyalty points to redeem
    } = req.body;

    if (!items || items.length === 0 || !shippingAddress || !paymentMethod) {
      return res.status(400).json({ error: 'Missing required order fields' });
    }

    const userId = req.user.id;

    // Fetch user profile
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    let subtotal = 0;
    const orderItemsToCreate = [];

    // Check stock & compute subtotal
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        return res.status(404).json({ error: `Product not found: ${item.productId}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for product: ${product.name}` });
      }

      subtotal += product.price * item.quantity;
      orderItemsToCreate.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    let discount = 0;

    // 1. Process Coupon
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode, isActive: true, expiresAt: { gte: new Date() } },
      });
      if (coupon) {
        if (subtotal >= coupon.minOrderValue) {
          if (coupon.discountType === 'PERCENTAGE') {
            discount = (subtotal * coupon.discountValue) / 100;
            if (coupon.maxDiscount && discount > coupon.maxDiscount) {
              discount = coupon.maxDiscount;
            }
          } else {
            discount = coupon.discountValue;
          }
        }
      }
    }

    // 2. Process Loyalty Points Redemption
    let pointsDiscount = 0;
    if (redeemPoints && redeemPoints > 0) {
      const pointsToRedeem = Math.min(user.loyaltyPoints, redeemPoints);
      pointsDiscount = pointsToRedeem * 0.1; // $0.10 discount per point
      discount += pointsDiscount;

      // Update user loyalty points (deduct)
      await prisma.user.update({
        where: { id: userId },
        data: { loyaltyPoints: { decrement: pointsToRedeem } },
      });

      await prisma.loyaltyTransaction.create({
        data: {
          userId,
          points: -pointsToRedeem,
          type: 'REDEEMED',
          description: `Redeemed ${pointsToRedeem} points on checkout`,
        },
      });
    }

    // 3. Process Gift Card
    let giftCardDiscount = 0;
    let giftCardIdToUpdate = null;
    let finalGiftCardBalance = 0;
    
    if (giftCardCode) {
      const giftCard = await prisma.giftCard.findUnique({
        where: { code: giftCardCode, isActive: true },
      });
      if (giftCard && giftCard.balance > 0) {
        const remainingCost = subtotal - discount;
        if (giftCard.balance >= remainingCost) {
          giftCardDiscount = remainingCost;
          finalGiftCardBalance = giftCard.balance - remainingCost;
        } else {
          giftCardDiscount = giftCard.balance;
          finalGiftCardBalance = 0;
        }
        discount += giftCardDiscount;
        giftCardIdToUpdate = giftCard.id;
      }
    }

    const total = Math.max(0, subtotal - discount);

    // Decrement inventory stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Update Gift Card balance if applied
    if (giftCardIdToUpdate) {
      await prisma.giftCard.update({
        where: { id: giftCardIdToUpdate },
        data: {
          balance: finalGiftCardBalance,
          isActive: finalGiftCardBalance > 0,
        },
      });
    }

    // Earn Loyalty Points: 1 point per $10 spent
    const pointsEarned = Math.floor(total / 10);
    if (pointsEarned > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: { loyaltyPoints: { increment: pointsEarned } },
      });
      await prisma.loyaltyTransaction.create({
        data: {
          userId,
          points: pointsEarned,
          type: 'EARNED',
          description: `Earned points from order purchase`,
        },
      });
    }

    // Generate Order Number
    const orderNumber = `GH-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

    // Create Order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        status: paymentMethod === 'COD' ? 'PENDING' : 'PAID',
        total,
        paymentMethod,
        paymentId,
        shippingAddress,
        discountAmount: discount,
        couponCode,
        items: {
          create: orderItemsToCreate,
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    // Clear cart items
    await prisma.cartItem.deleteMany({ where: { userId } });

    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error: any) {
    console.error('Order Creation Error:', error);
    res.status(500).json({ error: error.message || 'Error creating order' });
  }
};

export const getOrderHistory = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order history' });
  }
};

export const trackOrder = async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params;

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({
      orderNumber: order.orderNumber,
      status: order.status,
      createdAt: order.createdAt,
      total: order.total,
      trackingNumber: order.trackingNumber,
      trackingCarrier: order.trackingCarrier,
      items: order.items,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error tracking order' });
  }
};
