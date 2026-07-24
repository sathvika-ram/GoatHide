'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import { useTranslation } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useCartWishlist } from '@/context/CartWishlistContext';
import { Trash2, ArrowRight, Sparkles, Tag, Gift } from 'lucide-react';
import Link from 'next/link';

export default function Cart() {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    coupon, 
    giftCard, 
    pointsToRedeem,
    applyCoupon, 
    applyGiftCard, 
    setPointsToRedeem,
    getCartTotal, 
    getDiscountAmount, 
    getFinalTotal 
  } = useCartWishlist();

  const [promoCode, setPromoCode] = useState('');
  const [giftCode, setGiftCode] = useState('');
  const [pointsInput, setPointsInput] = useState(0);

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode) return;
    const ok = await applyCoupon(promoCode);
    if (ok) {
      alert('Promo code applied successfully.');
      setPromoCode('');
    } else {
      alert('Invalid or expired promo code.');
    }
  };

  const handleApplyGift = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftCode) return;
    const ok = await applyGiftCard(giftCode);
    if (ok) {
      alert('Gift card applied.');
      setGiftCode('');
    } else {
      alert('Invalid gift card code.');
    }
  };

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 space-y-10">
        <h1 className="text-3xl sm:text-5xl font-serif tracking-wider">Shopping Bag</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white/40 dark:bg-black/10 border border-luxury-gold-500/10 rounded">
            <Trash2 className="w-12 h-12 mx-auto text-luxury-gold-200 mb-4" />
            <p className="font-serif italic text-luxury-charcoal-400">{t('cart.empty')}</p>
            <Link 
              href="/shop"
              className="mt-6 inline-block bg-luxury-gold-500 hover:bg-luxury-gold-600 text-luxury-charcoal-900 font-bold uppercase text-[10px] tracking-widest px-6 py-2.5 rounded transition-all duration-300"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column: Cart list */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.productId}
                  className="bg-white dark:bg-luxury-charcoal-800 p-4 border border-luxury-gold-500/5 rounded flex gap-6 items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 bg-luxury-charcoal-100 dark:bg-luxury-charcoal-900 rounded relative overflow-hidden flex items-center justify-center text-center font-bold text-[8px] p-2 text-luxury-charcoal-500">
                      {item.name}
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-semibold">{item.name}</h3>
                      <span className="text-xs text-luxury-gold-500 font-bold block mt-1">{formatPrice(item.price)}</span>
                    </div>
                  </div>

                  <div className="flex gap-8 items-center">
                    {/* Quantity Controls */}
                    <div className="flex border border-luxury-gold-500/20 text-xs rounded overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-luxury-gold-500/10"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 font-bold flex items-center justify-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-luxury-gold-500/10"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-bold text-luxury-charcoal-800 dark:text-luxury-ivory-100 w-20 text-right">
                      {formatPrice(item.price * item.quantity)}
                    </span>

                    <button 
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Calculations and Coupons */}
            <div className="space-y-6">
              
              {/* Calculations Card */}
              <div className="bg-white dark:bg-luxury-charcoal-800 border border-luxury-gold-500/10 p-6 rounded space-y-4 shadow-sm">
                <h3 className="font-serif text-base tracking-wider border-b border-luxury-gold-500/5 pb-2">Bag Summary</h3>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-luxury-charcoal-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-luxury-charcoal-850 dark:text-luxury-ivory-100">{formatPrice(getCartTotal())}</span>
                  </div>
                  {getDiscountAmount() > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Total Savings</span>
                      <span>-{formatPrice(getDiscountAmount())}</span>
                    </div>
                  )}
                  {coupon && (
                    <div className="flex justify-between text-xs text-luxury-gold-500 font-bold">
                      <span>Coupon Applied</span>
                      <span>{coupon.code}</span>
                    </div>
                  )}
                  {giftCard && (
                    <div className="flex justify-between text-xs text-luxury-gold-500 font-bold">
                      <span>Gift Card Applied</span>
                      <span>-{formatPrice(Math.min(giftCard.balance, getCartTotal()))}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold border-t border-luxury-gold-500/10 pt-3">
                    <span>Total</span>
                    <span className="text-luxury-gold-500">{formatPrice(getFinalTotal())}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-luxury-gold-500 hover:bg-luxury-gold-600 text-luxury-charcoal-900 font-bold py-3 block text-center uppercase text-xs tracking-wider transition-colors duration-300 rounded flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Coupons Form */}
              <div className="bg-white/40 dark:bg-black/10 border border-luxury-gold-500/10 p-6 rounded space-y-4">
                <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-luxury-gold-500 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Redeem Promo Coupon
                </h3>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="WELCOME10"
                    className="flex-1 bg-transparent border border-luxury-gold-500/20 px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold-500 rounded placeholder-luxury-charcoal-400"
                  />
                  <button type="submit" className="bg-luxury-charcoal-900 text-luxury-gold-200 px-4 py-2 uppercase text-[10px] tracking-wider font-bold hover:bg-luxury-gold-500 hover:text-luxury-charcoal-900 rounded">
                    Apply
                  </button>
                </form>
              </div>

              {/* Gift Cards Form */}
              <div className="bg-white/40 dark:bg-black/10 border border-luxury-gold-500/10 p-6 rounded space-y-4">
                <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-luxury-gold-500 flex items-center gap-2">
                  <Gift className="w-4 h-4" /> Redeem Gift Card
                </h3>
                <form onSubmit={handleApplyGift} className="flex gap-2">
                  <input
                    type="text"
                    value={giftCode}
                    onChange={(e) => setGiftCode(e.target.value)}
                    placeholder="GH-GIFT-VAL-500"
                    className="flex-1 bg-transparent border border-luxury-gold-500/20 px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold-500 rounded placeholder-luxury-charcoal-400"
                  />
                  <button type="submit" className="bg-luxury-charcoal-900 text-luxury-gold-200 px-4 py-2 uppercase text-[10px] tracking-wider font-bold hover:bg-luxury-gold-500 hover:text-luxury-charcoal-900 rounded">
                    Apply
                  </button>
                </form>
              </div>

              {/* Loyalty Points Form */}
              <div className="bg-white/40 dark:bg-black/10 border border-luxury-gold-500/10 p-6 rounded space-y-4">
                <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-luxury-gold-500 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Loyalty Points
                </h3>
                <div className="space-y-2">
                  <p className="text-[10px] text-luxury-charcoal-400">Deduct balance from checkout. 10 Points = $1.00 Off.</p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={pointsInput}
                      onChange={(e) => setPointsInput(Math.max(0, parseInt(e.target.value) || 0))}
                      placeholder="Points..."
                      className="flex-1 bg-transparent border border-luxury-gold-500/20 px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold-500 rounded placeholder-luxury-charcoal-400"
                    />
                    <button 
                      type="button" 
                      onClick={() => {
                        setPointsToRedeem(pointsInput);
                        alert(`Applied ${pointsInput} loyalty points.`);
                      }}
                      className="bg-luxury-charcoal-900 text-luxury-gold-200 px-4 py-2 uppercase text-[10px] tracking-wider font-bold hover:bg-luxury-gold-500 hover:text-luxury-charcoal-900 rounded"
                    >
                      Deduct
                    </button>
                  </div>
                </div>
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
