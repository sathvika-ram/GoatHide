'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function StoreLocator() {
  const STORES = [
    {
      city: "Florence Boutique",
      address: "Via de Tornabuoni 15, 50123 Florence, Italy",
      phone: "+39 055 218443",
      hours: "Mon - Sat: 10:00 AM - 7:00 PM | Sun: Closed",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=400"
    },
    {
      city: "London GOATHIDES",
      address: "42 Bond St, Mayfair, London W1S 2AA, United Kingdom",
      phone: "+44 20 7946 0999",
      hours: "Mon - Sat: 10:00 AM - 7:00 PM | Sun: 12:00 PM - 5:00 PM",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400"
    },
    {
      city: "New York Gallery",
      address: "85 Mercer St, SoHo, New York, NY 10012, United States",
      phone: "+1 (212) 555-0143",
      hours: "Mon - Sat: 11:00 AM - 8:00 PM | Sun: 12:00 PM - 6:00 PM",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400"
    },
    {
      city: "Tokyo Salon",
      address: "5-Chome Minami-Aoyama, Minato City, Tokyo 107-0062, Japan",
      phone: "+81 3 5555 0199",
      hours: "Mon - Sun: 11:00 AM - 8:00 PM",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=400"
    }
  ];

  const [activeStore, setActiveStore] = useState(0);

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16 flex-1 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold-500">Global Boutiques</span>
          <h1 className="text-3xl sm:text-5xl font-serif tracking-wider">Our Store Locations</h1>
          <p className="text-xs text-luxury-charcoal-400">Step inside our GOATHIDES to experience the scent, tactile grain, and weight of raw premium leather goods firsthand.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          
          {/* Store Selection List */}
          <div className="space-y-4">
            {STORES.map((store, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStore(idx)}
                className={`w-full text-left p-6 border rounded transition-all ${
                  activeStore === idx 
                    ? 'border-luxury-gold-500 bg-luxury-gold-500/5' 
                    : 'border-luxury-gold-500/10 hover:border-luxury-gold-500/30'
                }`}
              >
                <h3 className="font-serif text-sm font-bold text-luxury-charcoal-900 dark:text-luxury-ivory-100">{store.city}</h3>
                <p className="text-[10px] text-luxury-charcoal-400 mt-2 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-luxury-gold-500 flex-shrink-0" /> {store.address}</p>
              </button>
            ))}
          </div>

          {/* Active Store Showcase Details & Image Mock Map */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 bg-white dark:bg-luxury-charcoal-800 p-8 border border-luxury-gold-500/10 rounded shadow-sm">
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="font-serif text-2xl border-b border-luxury-gold-500/10 pb-2 text-luxury-gold-500">{STORES[activeStore].city}</h2>
                <div className="space-y-3 text-xs leading-relaxed text-luxury-charcoal-550">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-luxury-gold-500 flex-shrink-0 mt-0.5" />
                    <span>{STORES[activeStore].address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-luxury-gold-500" />
                    <span>{STORES[activeStore].phone}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-luxury-gold-500 flex-shrink-0 mt-0.5" />
                    <span>{STORES[activeStore].hours}</span>
                  </p>
                </div>
              </div>
              <button className="bg-luxury-charcoal-900 text-luxury-gold-200 py-2.5 uppercase text-[10px] tracking-widest font-bold hover:bg-luxury-gold-500 hover:text-luxury-charcoal-900 transition-all rounded w-full">
                Get Directions
              </button>
            </div>
            
            {/* Visual Store/Gallery Mock Image */}
            <div className="h-64 sm:h-auto bg-luxury-charcoal-100 rounded overflow-hidden relative shadow-inner">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url(${STORES[activeStore].image})` }}
              />
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <LiveChat />
    </>
  );
}
