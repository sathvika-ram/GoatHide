'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [refCode, setRefCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await signup(name, email, password, refCode || undefined);
    setLoading(false);
    if (ok) {
      router.push('/dashboard');
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-6 py-16 flex-1 flex flex-col justify-center">
        <div className="bg-white dark:bg-luxury-charcoal-800 p-8 border border-luxury-gold-500/10 rounded shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl sm:text-3xl font-serif tracking-wider">Join GOATHIDES</h1>
            <p className="text-[10px] text-luxury-charcoal-400 uppercase tracking-widest font-semibold">Unlock member privileges & rewards</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-luxury-charcoal-400">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sofia Lorenzo"
                className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold-500 text-luxury-charcoal-900 dark:text-luxury-ivory-100 rounded"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-luxury-charcoal-400">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sofia@goathides.com"
                className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold-500 text-luxury-charcoal-900 dark:text-luxury-ivory-100 rounded"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-luxury-charcoal-450">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold-500 text-luxury-charcoal-900 dark:text-luxury-ivory-100 rounded"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-luxury-charcoal-450">Referral Code (Optional)</label>
              <input
                type="text"
                value={refCode}
                onChange={(e) => setRefCode(e.target.value)}
                placeholder="GH-XXXX-99"
                className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold-500 text-luxury-charcoal-900 dark:text-luxury-ivory-100 rounded font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-luxury-charcoal-900 text-luxury-gold-200 py-3 uppercase text-xs tracking-wider font-bold hover:bg-luxury-gold-500 hover:text-luxury-charcoal-900 transition-colors rounded disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center text-xs text-luxury-charcoal-400 pt-2 border-t border-luxury-gold-500/5">
            Already registered? <Link href="/login" className="text-luxury-gold-500 hover:underline font-semibold">Sign In</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
