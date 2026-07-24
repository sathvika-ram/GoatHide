'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16 flex-1 space-y-8">
        <h1 className="text-3xl sm:text-5xl font-serif tracking-wider">Privacy Policy</h1>
        <p className="text-xs text-luxury-charcoal-400">Effective Date: July 22, 2026</p>
        
        <div className="space-y-6 text-xs sm:text-sm text-luxury-charcoal-500 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-luxury-charcoal-800 dark:text-luxury-ivory-100">1. Information We Collect</h2>
            <p>We collect information you supply when placing orders, registering accounts, or writing reviews. This includes name, delivery address, payment tokens, and device identifiers collected via browser cookies.</p>
          </section>
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-luxury-charcoal-800 dark:text-luxury-ivory-100">2. Processing Your Details</h2>
            <p>Your details are used solely to fulfill purchases, check against order fraudulent flags, award referral benefits, and deliver invoice details. We do not sell user data to third-party advertising companies.</p>
          </section>
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-luxury-charcoal-800 dark:text-luxury-ivory-100">3. Information Storage & Safety</h2>
            <p>We utilize secure server infrastructures, full HTTPS encryption, and tokenized Stripe/PayPal checkout routes. Financial details are never cached directly on our databases.</p>
          </section>
        </div>
      </main>
      <Footer />
      <LiveChat />
    </>
  );
}
