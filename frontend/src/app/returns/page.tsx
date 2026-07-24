'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';

export default function Returns() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16 flex-1 space-y-8">
        <h1 className="text-3xl sm:text-5xl font-serif tracking-wider">Returns & Exchanges</h1>
        <p className="text-xs text-luxury-charcoal-400">Policy Terms & Directions</p>
        
        <div className="space-y-6 text-xs sm:text-sm text-luxury-charcoal-500 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-luxury-charcoal-800 dark:text-luxury-ivory-100">30-Day Evaluation</h2>
            <p>If you are not completely satisfied with the shape, finish, or texture of your leather piece, you can request an exchange or refund within 30 days of arrival. Items must be in brand-new, unused condition with dust bag tags attached.</p>
          </section>
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-luxury-charcoal-800 dark:text-luxury-ivory-105">How to Start a Return</h2>
            <p>Email concierge@goathides.com with your GH- reference order number and request a return waybill. Pack the product carefully inside its protective container and drop it off at your nearest express carrier depot.</p>
          </section>
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-luxury-charcoal-800 dark:text-luxury-ivory-100">Refund Processing</h2>
            <p>Once arrived at our Florence warehouse, quality checks are completed within 48 hours. Credits are returned to your payment method (Stripe, Razorpay, or PayPal) in 5-10 business days.</p>
          </section>
        </div>
      </main>
      <Footer />
      <LiveChat />
    </>
  );
}
