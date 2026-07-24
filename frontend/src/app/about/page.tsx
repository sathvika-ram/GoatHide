'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';

export default function About() {
  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16 flex-1 space-y-16">
        
        {/* Intro section */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold-500">Our Story</span>
          <h1 className="text-4xl sm:text-6xl font-serif tracking-wider">Independent Luxury. Designed for Legacy.</h1>
          <p className="text-xs sm:text-sm leading-relaxed text-luxury-charcoal-500">
            Founded 50 years ago, GOATHIDES emerged from a simple observation: modern luxury had become hurried, generic, and fragile. We set out to reverse this current by returning to slow, artisanal leathercraft that prioritizes raw organic materials, master tailoring, and lifetime durability.
          </p>
        </section>

        {/* Brand Pillars Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {[
            { title: "Vegetable Tanning", desc: "No harsh chrome chemicals. We cure our goat hides inside open wooden vats utilizing natural oak and chestnut bark extracts, a process taking up to 40 days to yield rich organic tones." },
            { title: "Artisanal Assembly", desc: "Every seam, edge-dye, and stitch is hand-guided by master leatherworkers in regional European studios, blending century-old techniques with clean minimalist geometries." },
            { title: "The Goat Hide Edge", desc: "Goat hide has a natural tight pebble grain that is lighter, more flexible, and significantly more water-resistant than traditional cowhide, ensuring your bag remains supple for a lifetime." }
          ].map((pil, idx) => (
            <div key={idx} className="bg-white dark:bg-luxury-charcoal-800 border border-luxury-gold-500/5 p-6 rounded space-y-3">
              <span className="font-serif text-3xl text-luxury-gold-500 font-bold">0{idx + 1}</span>
              <h3 className="font-serif text-lg text-luxury-charcoal-900 dark:text-luxury-ivory-50">{pil.title}</h3>
              <p className="text-xs leading-relaxed text-luxury-charcoal-500">{pil.desc}</p>
            </div>
          ))}
        </section>

        {/* Legacy segment */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-luxury-gold-500/5 p-8 sm:p-12 rounded">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-4xl font-serif tracking-wider leading-tight">Designed to Patina</h2>
            <p className="text-xs sm:text-sm text-luxury-charcoal-500 leading-relaxed">
              We do not coat our leather in heavy plastic sealing chemicals. Our vegetable-tanned hides are left breathing and reactive. Over years of use, they absorb oils from your hands, sunlight, and the rain, deepening in shade and softening in texture to record an organic visual chronicle of your travels. This is a patina—a badge of honor worn by items built for legacy.
            </p>
          </div>
          <div className="h-[320px] bg-luxury-charcoal-100 rounded overflow-hidden relative shadow-lg">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-[url('/legacy.jpg')]"
            />
          </div>
        </section>

      </main>

      <Footer />
      <LiveChat />
    </>
  );
}
