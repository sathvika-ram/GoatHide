'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import { CheckCircle, Truck, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || `GH-${Date.now()}`;

  useEffect(() => {
    // Dynamic import to execute confetti safely in client browser
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FAF6ED', '#1A1A1A'],
      });
    });
  }, []);

  return (
    <>
      <Header />

      <main className="max-w-xl mx-auto px-6 py-20 flex-1 text-center space-y-6">
        <CheckCircle className="w-16 h-16 mx-auto text-luxury-gold-500" />
        
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-luxury-gold-500">Transaction Complete</span>
          <h1 className="text-3xl sm:text-5xl font-serif tracking-wider">Thank You for Your Order</h1>
          <p className="text-xs text-luxury-charcoal-400">An email invoice has been sent to your registered account.</p>
        </div>

        <div className="border border-luxury-gold-500/10 p-6 rounded bg-white/40 dark:bg-black/10 max-w-sm mx-auto space-y-3">
          <span className="text-[10px] text-luxury-charcoal-450 block font-bold uppercase">Order Reference</span>
          <span className="font-mono text-sm font-bold text-luxury-gold-500 block select-all">{orderNumber}</span>
          <div className="text-[10px] text-luxury-charcoal-400 bg-luxury-gold-500/5 py-1.5 px-3 rounded flex items-center justify-center gap-1.5 mx-auto w-fit">
            <Truck className="w-3.5 h-3.5" /> Shipping via Express Courier
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 max-w-sm mx-auto">
          <Link
            href={`/track?order=${orderNumber}`}
            className="flex-1 bg-luxury-charcoal-900 hover:bg-luxury-gold-500 text-luxury-gold-500 hover:text-luxury-charcoal-900 py-3 uppercase text-[10px] tracking-wider font-bold rounded transition-all duration-300 flex items-center justify-center gap-1"
          >
            Track Order <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/shop"
            className="flex-1 border border-luxury-gold-500/20 hover:border-luxury-gold-500/50 py-3 uppercase text-[10px] tracking-wider font-bold rounded transition-all duration-300 flex items-center justify-center gap-1"
          >
            Continue Shopping <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <Footer />
      <LiveChat />
    </>
  );
}

export default function OrderSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-serif text-lg tracking-widest bg-luxury-ivory-50 dark:bg-luxury-charcoal-900">Loading Order confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
