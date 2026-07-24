import { Request, Response } from 'express';
import prisma from '../config/db';

export const getDashboardAnalytics = async (req: Request, res: Response) => {
  try {
    // 1. Total Revenue
    const completedOrders = await prisma.order.findMany({
      where: { status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] } },
      select: { total: true },
    });
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);

    // 2. Orders Count
    const totalOrders = await prisma.order.count();

    // 3. Customers Count
    const totalCustomers = await prisma.user.count({
      where: { role: 'CUSTOMER' },
    });

    // 4. Inventory Alerts (Low Stock < 5)
    const lowStockProducts = await prisma.product.findMany({
      where: { stock: { lt: 5 } },
      select: { id: true, name: true, stock: true, sku: true },
    });

    // 5. Monthly Sales Analytics (Recharts formatted)
    // We group by month over the past 6 months. For simplicity, we query orders and format in memory.
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const historicalOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: sixMonthsAgo },
        status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
      },
      select: { total: true, createdAt: true },
    });

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const salesMap: { [key: string]: number } = {};

    // Initialize map for past 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      salesMap[key] = 0;
    }

    historicalOrders.forEach((o) => {
      const date = new Date(o.createdAt);
      const key = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      if (salesMap[key] !== undefined) {
        salesMap[key] += o.total;
      }
    });

    const salesData = Object.keys(salesMap).map((month) => ({
      name: month,
      sales: parseFloat(salesMap[month].toFixed(2)),
    }));

    res.status(200).json({
      metrics: {
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        totalOrders,
        totalCustomers,
        lowStockCount: lowStockProducts.length,
      },
      lowStockProducts,
      salesData,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error generating dashboard metrics' });
  }
};

export const getAdminOrders = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const where: any = {};
    if (status) {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: { include: { product: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status, trackingNumber, trackingCarrier } = req.body;

    if (!status) return res.status(400).json({ error: 'Status is required' });

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        trackingNumber: trackingNumber || undefined,
        trackingCarrier: trackingCarrier || undefined,
      },
    });

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Error updating order status' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, price, compareAtPrice, categoryId, stock, sku, images, details } = req.body;

    if (!name || !slug || !price || !categoryId || !sku) {
      return res.status(400).json({ error: 'Required fields: name, slug, price, categoryId, sku' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || '',
        price: parseFloat(price),
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        categoryId,
        stock: parseInt(stock) || 0,
        sku,
        images: images || [],
        details: details || {},
      },
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error creating product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, price, compareAtPrice, categoryId, stock, sku, images, details, isFeatured } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        price: price ? parseFloat(price) : undefined,
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : undefined,
        categoryId,
        stock: stock ? parseInt(stock) : undefined,
        sku,
        images,
        details,
        isFeatured,
      },
    });

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error updating product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};
