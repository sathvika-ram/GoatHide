'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import { Sparkles, Sun, Droplets, ShieldAlert } from 'lucide-react';

export default function LeatherCare() {
  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex-1 space-y-12 sm:space-y-16">
        
        {/* Intro */}
        <section className="relative isolate overflow-hidden rounded text-center max-w-4xl mx-auto px-5 py-16 sm:px-10 sm:py-24">
          <div className="absolute inset-0 -z-20 bg-luxury-charcoal-900" />
          <img src="/leathercare.jpg" alt="Leather care essentials" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 -z-10 bg-luxury-charcoal-900/55" />
          <div className="mx-auto max-w-2xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold-300">Care Guide</span>
            <h1 className="text-4xl sm:text-5xl font-serif tracking-wider text-luxury-ivory-50">Preserving the Patina</h1>
            <p className="text-xs sm:text-sm text-luxury-ivory-100 leading-relaxed">
              Full-grain vegetable-tanned goat leather requires minimal but thoughtful upkeep. Follow these simple practices to preserve its structural strength and natural beauty for generations.
            </p>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Avoid Direct Water",
              desc: "Goat hide has a natural water-resistant boundary, but prolonged soaking will cause stiffness. If caught in a downpour, gently blot the moisture immediately with a dry cloth and allow it to dry naturally away from radiators.",
              icon: Droplets,
            },
            {
              title: "Sun & Heat Exposure",
              desc: "Store your luxury goods in a cool, ventilated closet. Direct sunlight for weeks can bleach vegetable colors and dry the leather fibers out, making them prone to microscopic cracks.",
              icon: Sun,
            },
            {
              title: "Quarterly Hydration",
              desc: "Every 3 to 6 months, apply a tiny amount of natural leather cream or organic conditioner using a soft microfiber cloth in circular motions. This feeds the collagen fibers, keeping them supple.",
              icon: Sparkles,
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-luxury-charcoal-800 border border-luxury-gold-500/5 p-6 rounded space-y-4 shadow-sm">
              <div className="p-3 bg-luxury-gold-500/10 rounded-full text-luxury-gold-500 w-fit">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-luxury-charcoal-900 dark:text-luxury-ivory-50">{item.title}</h3>
              <p className="text-xs leading-relaxed text-luxury-charcoal-500">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Warnings */}
        <section className="bg-red-500/5 border border-red-500/15 p-8 rounded flex gap-4 items-start max-w-3xl mx-auto">
          <ShieldAlert className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-serif text-sm font-bold text-red-700 dark:text-red-400">Critical Warning: What NOT to use</h4>
            <p className="text-xs text-luxury-charcoal-550 leading-relaxed">
              Never utilize chemical cleaning sprays, standard dish soaps, alcohol wipes, or petroleum-based oils. These strip the natural waxes, causing permanent discoloration and drying out the natural fibers. If a stain persists, consult a luxury leather care professional.
            </p>
          </div>
        </section>

      </main>

      <Footer />
      <LiveChat />
    </>
  );
}
