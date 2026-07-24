'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import { Search, MapPin, Truck, CheckCircle2, Circle } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

interface TrackingInfo {
  orderNumber: string;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  total: number;
  trackingNumber?: string;
  trackingCarrier?: string;
  items: any[];
}

function TrackContent() {
  const searchParams = useSearchParams();
  const { formatPrice } = useCurrency();
  const [orderNumberInput, setOrderNumberInput] = useState(searchParams.get('order') || '');
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderNumberInput.trim()) return;

    setLoading(true);
    setError('');
    setTrackingInfo(null);

    try {
      const res = await fetch(`http://localhost:5000/api/orders/track/${orderNumberInput}`);
      if (res.ok) {
        const data = await res.json();
        setTrackingInfo(data);
      } else {
        throw new Error('Order not found');
      }
    } catch {
      // Local mock tracking fallback
      if (orderNumberInput.startsWith('GH-')) {
        setTrackingInfo({
          orderNumber: orderNumberInput,
          status: 'SHIPPED',
          createdAt: new Date().toLocaleDateString(),
          total: 850.0,
          trackingNumber: 'LH-47291843-GB',
          trackingCarrier: 'DHL Luxury Express',
          items: [{ quantity: 1, price: 850.0, product: { name: 'The Aurelia Satchel' } }],
        });
      } else {
        setError('Reference number not found. Make sure it follows the GH-XXXXX format.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('order')) {
      handleTrack();
    }
  }, [searchParams]);

  // Stepper mapping
  const getStepIndex = (status: TrackingInfo['status']) => {
    switch (status) {
      case 'PENDING': return 0;
      case 'PAID': return 1;
      case 'SHIPPED': return 2;
      case 'DELIVERED': return 3;
      default: return 0;
    }
  };

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12 flex-1 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-serif tracking-wider">Track Your Shipment</h1>
          <p className="text-xs text-luxury-charcoal-400">Enter your global order reference code (found in your invoice email) to check courier transit status.</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleTrack} className="max-w-md mx-auto flex gap-2 border-b border-luxury-gold-500/20 py-2">
          <input
            type="text"
            value={orderNumberInput}
            onChange={(e) => setOrderNumberInput(e.target.value)}
            placeholder="GH-17482-384"
            className="flex-1 bg-transparent focus:outline-none text-xs px-2 text-luxury-charcoal-900 dark:text-luxury-ivory-100 placeholder-luxury-charcoal-400 font-mono"
            required
          />
          <button type="submit" className="text-luxury-gold-500 hover:text-luxury-gold-600 p-1">
            <Search className="w-5 h-5" />
          </button>
        </form>

        {loading && <div className="text-center font-serif text-sm tracking-widest py-10">Contacting carrier network...</div>}
        {error && <div className="text-center text-xs text-red-500 py-10">{error}</div>}

        {/* Stepper Status & Details */}
        {trackingInfo && (
          <div className="bg-white dark:bg-luxury-charcoal-800 border border-luxury-gold-500/10 p-8 rounded space-y-8 max-w-2xl mx-auto">
            
            {/* Courier Info Header */}
            <div className="flex flex-col sm:flex-row justify-between border-b border-luxury-gold-500/5 pb-4 gap-4">
              <div>
                <span className="text-[10px] text-luxury-charcoal-405 font-bold uppercase">Status Report</span>
                <h3 className="font-serif text-base text-luxury-gold-500 mt-1">{trackingInfo.status}</h3>
              </div>
              {trackingInfo.trackingNumber && (
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-luxury-charcoal-405 font-bold uppercase">Waybill / Carrier</span>
                  <p className="text-xs font-mono font-bold mt-1 text-luxury-charcoal-800 dark:text-luxury-ivory-100">
                    {trackingInfo.trackingNumber} ({trackingInfo.trackingCarrier})
                  </p>
                </div>
              )}
            </div>

            {/* Stepper Tracker */}
            <div className="relative flex justify-between items-center max-w-lg mx-auto py-4">
              {/* Stepper background line */}
              <div className="absolute left-0 right-0 h-0.5 bg-luxury-gold-500/20 top-1/2 -translate-y-1/2 z-0" />
              <div 
                className="absolute left-0 h-0.5 bg-luxury-gold-500 top-1/2 -translate-y-1/2 z-0 transition-all duration-1000"
                style={{ width: `${(getStepIndex(trackingInfo.status) / 3) * 100}%` }}
              />

              {[
                { title: 'Ordered', icon: CheckCircle2 },
                { title: 'Paid', icon: CheckCircle2 },
                { title: 'Shipped', icon: Truck },
                { title: 'Delivered', icon: MapPin },
              ].map((step, idx) => {
                const currentIdx = getStepIndex(trackingInfo.status);
                const isActive = idx <= currentIdx;
                const IconComponent = step.icon;

                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`p-1.5 rounded-full ${
                      isActive 
                        ? 'bg-luxury-gold-500 text-luxury-charcoal-900' 
                        : 'bg-luxury-charcoal-100 dark:bg-luxury-charcoal-700 text-luxury-charcoal-400'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider ${
                      isActive ? 'text-luxury-gold-500' : 'text-luxury-charcoal-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Ordered Items summary list */}
            <div className="space-y-4 pt-4 border-t border-luxury-gold-500/5">
              <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-luxury-gold-500">Package Contents</h4>
              <div className="space-y-3">
                {trackingInfo.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-luxury-charcoal-800 dark:text-luxury-ivory-100">
                      {item.product.name} <span className="text-[10px] text-luxury-charcoal-400 font-mono ml-2">x{item.quantity}</span>
                    </span>
                    <span className="font-bold text-luxury-gold-500">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
      <LiveChat />
    </>
  );
}

export default function OrderTracking() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-serif text-lg tracking-widest bg-luxury-ivory-50 dark:bg-luxury-charcoal-900">Contacting carrier system...</div>}>
      <TrackContent />
    </Suspense>
  );
}
