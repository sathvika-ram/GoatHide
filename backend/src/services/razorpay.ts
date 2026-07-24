import crypto from 'crypto';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
  const amountInPaise = Math.round(amount * 100);

  if (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) {
    try {
      // Dynamic import to avoid errors if packages are loaded or not
      const Razorpay = require('razorpay');
      const rzp = new Razorpay({
        key_id: RAZORPAY_KEY_ID,
        key_secret: RAZORPAY_KEY_SECRET,
      });

      const order = await rzp.orders.create({
        amount: amountInPaise,
        currency,
        receipt: `receipt_gh_${Date.now()}`,
      });

      return {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        method: 'razorpay',
        mock: false,
      };
    } catch (error: any) {
      console.error('Razorpay Order Creation Error:', error);
      throw error;
    }
  }

  // Mock Fallback
  console.log('[MOCK PAYMENT]: Razorpay keys not found. Emulating Razorpay payment.');
  return {
    id: `rzp_order_mock_${Math.random().toString(36).substring(7)}`,
    amount: amountInPaise,
    currency,
    method: 'razorpay',
    mock: true,
  };
};

export const verifyRazorpaySignature = (orderId: string, paymentId: string, signature: string): boolean => {
  if (orderId.startsWith('rzp_order_mock_')) {
    return true; // Mock passes automatically
  }

  if (!RAZORPAY_KEY_SECRET) return false;

  const generatedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
};
