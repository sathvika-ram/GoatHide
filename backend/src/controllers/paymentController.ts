import { Request, Response } from 'express';
import { createStripePaymentIntent } from '../services/stripe';
import { createRazorpayOrder, verifyRazorpaySignature } from '../services/razorpay';
import { createPayPalOrder, capturePayPalOrder } from '../services/paypal';

export const processStripePayment = async (req: Request, res: Response) => {
  try {
    const { amount, currency } = req.body;
    if (!amount) return res.status(400).json({ error: 'Amount is required' });

    const paymentIntent = await createStripePaymentIntent(amount, currency || 'usd');
    res.status(200).json(paymentIntent);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error processing Stripe payment' });
  }
};

export const processRazorpayPayment = async (req: Request, res: Response) => {
  try {
    const { amount, currency } = req.body;
    if (!amount) return res.status(400).json({ error: 'Amount is required' });

    const razorpayOrder = await createRazorpayOrder(amount, currency || 'INR');
    res.status(200).json(razorpayOrder);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error processing Razorpay payment' });
  }
};

export const verifyRazorpayPayment = async (req: Request, res: Response) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({ error: 'Missing signature fields' });
    }

    const isValid = verifyRazorpaySignature(orderId, paymentId, signature);
    if (isValid) {
      res.status(200).json({ status: 'success', message: 'Signature verified successfully' });
    } else {
      res.status(400).json({ status: 'failure', error: 'Invalid Razorpay signature' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error verifying Razorpay signature' });
  }
};

export const processPayPalPayment = async (req: Request, res: Response) => {
  try {
    const { amount, currency } = req.body;
    if (!amount) return res.status(400).json({ error: 'Amount is required' });

    const order = await createPayPalOrder(amount, currency || 'USD');
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error processing PayPal payment' });
  }
};

export const verifyPayPalPayment = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ error: 'OrderId is required' });

    const capture = await capturePayPalOrder(orderId);
    res.status(200).json(capture);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error verifying PayPal payment' });
  }
};
