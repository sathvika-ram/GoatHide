import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
let stripe: Stripe | null = null;

if (stripeSecret) {
  stripe = new Stripe(stripeSecret, {
    apiVersion: '2024-04-16' as any,
  });
}

export const createStripePaymentIntent = async (amount: number, currency: string = 'usd') => {
  const amountInCents = Math.round(amount * 100);

  if (stripe) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency,
        metadata: { integration: 'goathides_luxury' },
      });
      return {
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        method: 'stripe',
        mock: false,
      };
    } catch (error: any) {
      console.error('Stripe PaymentIntent Creation Error:', error);
      throw error;
    }
  }

  // Mock Fallback
  console.log('[MOCK PAYMENT]: Stripe secret key not found. Emulating Stripe payment.');
  return {
    id: `mock_stripe_intent_${Math.random().toString(36).substring(7)}`,
    clientSecret: `mock_stripe_secret_${Math.random().toString(36).substring(7)}`,
    method: 'stripe',
    mock: true,
  };
};
