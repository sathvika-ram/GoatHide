'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16 flex-1 space-y-16">
        
        {/* Header */}
        <section className="text-center max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold-500">Concierge Desk</span>
          <h1 className="text-4xl sm:text-5xl font-serif tracking-wider">Contact Our Advisors</h1>
          <p className="text-xs sm:text-sm text-luxury-charcoal-500 leading-relaxed">
            Whether inquiring about product details, custom sizing modifications, or shipment options, our dedicated advisory team is available to assist you.
          </p>
        </section>

        {/* Channels Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Channel Info */}
          <div className="space-y-8">
            <h3 className="font-serif text-2xl tracking-wider">GOATHIDES Channels</h3>
            
            <div className="space-y-6 text-xs sm:text-sm">
              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-luxury-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Main Headquarters</h4>
                  <p className="text-luxury-charcoal-500 mt-1">GOATHIDES Design House</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Mail className="w-5 h-5 text-luxury-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Inquiries & Returns</h4>
                  <p className="text-luxury-charcoal-500 mt-1">askus@goathides.com</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Phone className="w-5 h-5 text-luxury-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Customer Service</h4>
                  <p className="text-luxury-charcoal-500 mt-1">+1 (800) 462-8443 (Mon - Fri: 9:00 AM - 6:00 PM CET)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-luxury-charcoal-800 border border-luxury-gold-500/10 p-8 rounded shadow-sm">
            <h3 className="font-serif text-lg mb-6">Send Message</h3>
            
            {submitted ? (
              <div className="text-center py-10 space-y-2">
                <h4 className="font-serif text-base text-luxury-gold-500">Message Received</h4>
                <p className="text-xs text-luxury-charcoal-400">An advisor will reach out to you within 24 business hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-[10px] uppercase font-bold text-luxury-gold-500 hover:underline">Send another inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-luxury-charcoal-450">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold-500 text-luxury-charcoal-900 dark:text-luxury-ivory-100 rounded"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-luxury-charcoal-455">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold-500 text-luxury-charcoal-900 dark:text-luxury-ivory-100 rounded"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-luxury-charcoal-455">Message Details</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Provide details on customization or product codes..."
                    className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold-500 text-luxury-charcoal-900 dark:text-luxury-ivory-100 rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-luxury-charcoal-900 text-luxury-gold-200 py-3 uppercase text-xs tracking-wider font-bold hover:bg-luxury-gold-500 hover:text-luxury-charcoal-900 transition-colors rounded"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </section>

      </main>

      <Footer />
      <LiveChat />
    </>
  );
}
