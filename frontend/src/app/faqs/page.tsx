'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export default function FAQs() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const FAQS: FaqItem[] = [
    {
      q: "Where do you ship products from?",
      a: "All GOATHIDES orders are packaged and dispatched from our primary GOATHIDES and distribution hub in Florence, Italy, using trackable air express services."
    },
    {
      q: "How long does shipping take?",
      a: "Express shipments to the EU and North America take 3-5 business days. International delivery routes take 5-10 business days. Full tracking codes are emailed within 24 hours of dispatch."
    },
    {
      q: "What is your warranty policy?",
      a: "We build for legacy. Every bag carries a Lifetime Guarantee covering manufacturing defects in seams, zippers, and solid brass locks. We do not cover cosmetic leather scrapes occurring during use."
    },
    {
      q: "Do you accept returns?",
      a: "Yes. We accept returns of unused, undamaged products in original packaging within 30 days of delivery. Returns are free for all domestic orders. International return shipping labels can be requested from the concierge."
    }
  ];

  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-16 flex-1 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold-500">Advisory Desk</span>
          <h1 className="text-3xl sm:text-5xl font-serif tracking-wider">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="border border-luxury-gold-500/10 rounded overflow-hidden bg-white/40 dark:bg-black/10"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-luxury-gold-500/5 transition-colors"
                >
                  <span className="font-serif text-sm font-semibold tracking-wide text-luxury-charcoal-900 dark:text-luxury-ivory-100">{faq.q}</span>
                  {isOpen ? <Minus className="w-4 h-4 text-luxury-gold-500" /> : <Plus className="w-4 h-4 text-luxury-gold-500" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm leading-relaxed text-luxury-charcoal-500 border-t border-luxury-gold-500/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
      <LiveChat />
    </>
  );
}
