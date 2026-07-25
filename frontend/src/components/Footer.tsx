'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSuccess(true);
      setEmail('');
    } catch {
      setSuccess(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-luxury-charcoal-900 text-luxury-charcoal-300 border-t border-luxury-gold-500/10 mt-auto">
      {/* Newsletter Block */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-b border-luxury-charcoal-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-serif text-xl text-luxury-gold-200 tracking-wider">Join the GOATHIDES Circle</h3>
          <p className="text-xs text-luxury-charcoal-400 mt-1 max-w-sm">Receive invitations to private viewings, seasonal launches, and care guides.</p>
        </div>
        <form onSubmit={handleSubscribe} className="w-full md:w-auto flex max-w-md border-b border-luxury-gold-500/30 py-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-transparent flex-1 focus:outline-none text-luxury-gold-100 placeholder-luxury-charcoal-500 text-xs px-2 w-64"
            required
          />
          <button type="submit" className="text-luxury-gold-200 hover:text-luxury-gold-500 p-1">
            <Send className="w-4 h-4" />
          </button>
        </form>
        {success && <p className="text-xs text-luxury-gold-400 absolute">Thank you for subscribing.</p>}
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand Summary */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/goat.jpeg"
              alt="GOATHIDES logo"
              width={42}
              height={42}
              className="rounded-full object-cover border border-luxury-gold-500/30"
            />
            <h4 className="font-serif text-lg tracking-widest text-luxury-gold-400">GOATHIDES</h4>
          </div>
          <p className="text-xs leading-relaxed max-w-xs text-luxury-charcoal-400">
            Crafted for Life. Designed for Legacy. Independent artisans shaping premium goat leather into permanent expressions of luxury.
          </p>
          <div className="flex gap-4 text-xs text-luxury-charcoal-400 pt-2">
            <Link href="https://instagram.com" className="hover:text-luxury-gold-500">Instagram</Link>
            <Link href="https://facebook.com" className="hover:text-luxury-gold-500">Facebook</Link>
            <Link href="https://pinterest.com" className="hover:text-luxury-gold-500">Pinterest</Link>
          </div>
        </div>

        {/* Collections */}
        <div>
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-luxury-gold-200 mb-6">Collections</h4>
          <ul className="space-y-3 text-xs">
            <li><Link href="/shop?category=luxury-womens-handbags" className="hover:text-luxury-gold-500">Women's Handbags</Link></li>
            <li><Link href="/shop?category=luxury-laptop-bags" className="hover:text-luxury-gold-500">Laptop Bags</Link></li>
            <li><Link href="/shop?category=leather-wallets" className="hover:text-luxury-gold-500">Wallets & Small Goods</Link></li>
            <li><Link href="/shop?category=formal-shoes" className="hover:text-luxury-gold-500">Formal Shoes & Loafers</Link></li>
            <li><Link href="/shop?category=leather-jackets" className="hover:text-luxury-gold-500">Leather Jackets</Link></li>
          </ul>
        </div>

        {/* Customer Experience */}
        <div>
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-luxury-gold-200 mb-6">Experience</h4>
          <ul className="space-y-3 text-xs">
            <li><Link href="/craftsmanship" className="hover:text-luxury-gold-500">Our Craftsmanship</Link></li>
            <li><Link href="/leather-care" className="hover:text-luxury-gold-500">Leather Care</Link></li>
            <li><Link href="/store-locator" className="hover:text-luxury-gold-500">Store Locator</Link></li>
            <li><Link href="/faqs" className="hover:text-luxury-gold-500">FAQs</Link></li>
            <li><Link href="/returns" className="hover:text-luxury-gold-500">Returns & Exchanges</Link></li>
          </ul>
        </div>

        {/* Brand Concierge */}
        <div>
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-luxury-gold-200 mb-6">Contact</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-luxury-gold-500" />
              <span>Warangal, Telangana</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-luxury-gold-500" />
              <span>+9100000000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-luxury-gold-500" />
              <span>Contact us @goathides.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom copyright and payment icons */}
      <div className="bg-luxury-charcoal-950 py-6 text-center text-[10px] text-luxury-charcoal-500 px-6 border-t border-luxury-charcoal-800">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <div>@2026 goat heights all rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
