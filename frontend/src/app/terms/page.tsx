'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';

export default function Terms() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16 flex-1 space-y-8">
        <h1 className="text-3xl sm:text-5xl font-serif tracking-wider">Terms of Service</h1>
        <p className="text-xs text-luxury-charcoal-400">Effective Date: July 22, 2026</p>
        
        <div className="space-y-6 text-xs sm:text-sm text-luxury-charcoal-500 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-luxury-charcoal-800 dark:text-luxury-ivory-100">1. Acceptance of Terms</h2>
            <p>By visiting the GOATHIDES store, placing orders, or logging into your account, you agree to comply with our conditions, shipping constraints, and warranty frameworks.</p>
          </section>
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-luxury-charcoal-800 dark:text-luxury-ivory-100">2. Purchasing & Pricing</h2>
            <p>We reserve the right to cancel orders if stock data is incorrect, or if a coupon structure has been exploited. Prices are listed dynamically based on locale conversion rates, subject to updates at checkout.</p>
          </section>
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-luxury-charcoal-800 dark:text-luxury-ivory-100">3. Intellectual Property</h2>
            <p>All brand marks, page structures, imagery, and text content belong to GOATHIDES S.p.A. Copying designs is strictly forbidden.</p>
          </section>
        </div>
      </main>
      <Footer />
      <LiveChat />
    </>
  );
}
