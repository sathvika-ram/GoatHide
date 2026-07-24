import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      }
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, category, minPrice, maxPrice, featured, sort } = req.query;

    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    if (category) {
      whereClause.category = { slug: String(category) };
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price.gte = parseFloat(String(minPrice));
      if (maxPrice) whereClause.price.lte = parseFloat(String(maxPrice));
    }

    if (featured) {
      whereClause.isFeatured = featured === 'true';
    }

    let orderBy: any = { createdAt: 'desc' }; // default
    if (sort) {
      if (sort === 'price_asc') orderBy = { price: 'asc' };
      else if (sort === 'price_desc') orderBy = { price: 'desc' };
      else if (sort === 'rating') orderBy = { rating: 'desc' };
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: { category: true },
      orderBy: orderBy,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        reviews: {
          include: {
            user: { select: { name: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Fetch related products (same category, excluding current product)
    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
      },
      take: 4,
    });

    // Emulate "Frequently Bought Together" (featured or high rating from same category)
    const frequentlyBought = await prisma.product.findMany({
      where: {
        id: { not: product.id },
      },
      orderBy: { rating: 'desc' },
      take: 2,
    });

    res.status(200).json({
      product,
      relatedProducts,
      frequentlyBought,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

export const addReview = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const { productId, rating, title, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ error: 'ProductId, rating, and comment are required' });
    }

    const review = await prisma.review.create({
      data: {
        userId: req.user.id,
        productId,
        rating: parseInt(String(rating)),
        title,
        comment,
      },
    });

    // Recalculate average rating & review count for the product
    const allReviews = await prisma.review.findMany({
      where: { productId },
      select: { rating: true },
    });

    const reviewCount = allReviews.length;
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = parseFloat((totalRating / reviewCount).toFixed(1));

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: averageRating,
        reviewCount: reviewCount,
      },
    });

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ error: 'Error adding review' });
  }
};

export const newsletterSignup = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    
    // Simulate successful newsletter subscription
    res.status(200).json({ message: 'Subscribed successfully. Check your inbox for exclusive updates.' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing newsletter signup' });
  }
};
