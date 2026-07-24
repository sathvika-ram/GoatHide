import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretgoatkey';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, referralCode } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    // Generate a unique referral code
    const generatedReferral = `GH-${name.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Handle referral if code provided
    let referrerId: string | undefined = undefined;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({ where: { referralCode } });
      if (referrer) {
        referrerId = referrer.id;
      }
    }

    // Create User
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        referralCode: generatedReferral,
        referredById: referrerId,
        loyaltyPoints: referrerId ? 100 : 50, // Bonus points for using a referral code
      },
    });

    // Award points to referrer if valid
    if (referrerId) {
      await prisma.user.update({
        where: { id: referrerId },
        data: { loyaltyPoints: { increment: 150 } }, // 150 points for referring someone
      });

      await prisma.loyaltyTransaction.create({
        data: {
          userId: referrerId,
          points: 150,
          type: 'EARNED',
          description: `Referral bonus for inviting ${name}`,
        },
      });

      await prisma.loyaltyTransaction.create({
        data: {
          userId: newUser.id,
          points: 100,
          type: 'EARNED',
          description: `Sign up bonus from referral code: ${referralCode}`,
        },
      });
    } else {
      await prisma.loyaltyTransaction.create({
        data: {
          userId: newUser.id,
          points: 50,
          type: 'EARNED',
          description: 'Welcome reward points',
        },
      });
    }

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        referralCode: newUser.referralCode,
        loyaltyPoints: newUser.loyaltyPoints,
      },
    });
  } catch (error: any) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: error.message || 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        referralCode: user.referralCode,
        loyaltyPoints: user.loyaltyPoints,
      },
    });
  } catch (error: any) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        loyaltyTransactions: { orderBy: { createdAt: 'desc' }, take: 10 },
        orders: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        referralCode: user.referralCode,
        loyaltyPoints: user.loyaltyPoints,
        loyaltyTransactions: user.loyaltyTransactions,
        orders: user.orders,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};
