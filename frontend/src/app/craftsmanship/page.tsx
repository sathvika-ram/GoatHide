'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import { ShieldCheck, Sparkles, Award } from 'lucide-react';

export default function Craftsmanship() {
  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16 flex-1 space-y-20">
        
        {/* Intro */}
        <section className="text-center max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold-500">GOATHIDES</span>
          <h1 className="text-4xl sm:text-5xl font-serif tracking-wider">Uncompromising Construction</h1>
          <p className="text-xs sm:text-sm text-luxury-charcoal-500 leading-relaxed">
            A luxury leather piece is only as permanent as its weakest seam. In our GOATHIDES, we assemble bags using traditional leathercraft techniques that modern industrial assembly lines have abandoned.
          </p>
        </section>

        {/* Steps walkthrough */}
        <section className="space-y-12">
          {[
            {
              title: "Saddle Stitching by Hand",
              desc: "Unlike standard sewing machine lockstitches which unravel completely if a single thread breaks, our artisans employ saddle stitching using two needles on a single waxed linen thread. If one thread snaps, the alternate thread maintains structural tension, preserving the seam.",
              icon: Award,
              img: "/saddle.jpg"
            },
            {
              title: "Hand-Burnished Painted Edges",
              desc: "Raw edges of cut leather are highly vulnerable to moisture entry and fraying. We seal every cut edge by manually applying three layers of premium water-based edge paint, burnishing with beeswax and hot iron irons between coatings to create a permanent glossy seal.",
              icon: Sparkles,
              img: "handbrushed.jpg"
            },
            {
              title: "Solid Brass Hardware",
              desc: "Standard e-commerce bags utilize cheap zinc alloys which chip and rust. GOATHIDES utilizes exclusively custom solid brass locks, buckles, and feet. Sand-cast and hand-polished, our hardware weights beautifully and develops its own vintage patina.",
              icon: ShieldCheck,
              img: "solidbrass.jpg"
            }
          ].map((step, idx) => (
            <div key={idx} className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
              idx % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}>
              <div className={`space-y-6 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-luxury-gold-500/10 rounded-full text-luxury-gold-500">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-sm font-bold uppercase tracking-wider text-luxury-charcoal-400">Pillar 0{idx + 1}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif tracking-wider">{step.title}</h3>
                <p className="text-xs sm:text-sm text-luxury-charcoal-500 leading-relaxed">{step.desc}</p>
              </div>
              <div className="h-[350px] bg-luxury-charcoal-100 rounded overflow-hidden relative shadow-xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${step.img})` }}
                />
              </div>
            </div>
          ))}
        </section>

      </main>

      <Footer />
      <LiveChat />
    </>
  );
}
