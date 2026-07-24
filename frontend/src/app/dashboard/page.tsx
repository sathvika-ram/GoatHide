'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Star, Gift, Truck, RefreshCw, Award, Copy, Check } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  paymentMethod: string;
}

export default function CustomerDashboard() {
  const { user, token, logout, syncProfile } = useAuth();
  const { formatPrice } = useCurrency();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    syncProfile();

    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders/history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          throw new Error();
        }
      } catch {
        // Fallback local mockup orders if offline
        setOrders([
          {
            id: 'o1',
            orderNumber: 'GH-17482-384',
            total: 850.0,
            status: 'SHIPPED',
            createdAt: new Date().toLocaleDateString(),
            paymentMethod: 'STRIPE',
          },
        ]);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [token]);

  const handleCopyCode = () => {
    if (!user) return;
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-luxury-ivory-50 dark:bg-luxury-charcoal-900 flex items-center justify-center font-serif text-lg tracking-widest">
        Verifying Credentials...
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 space-y-10">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-luxury-gold-500/10 pb-6 gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-luxury-gold-500">Member Portal</span>
            <h1 className="text-3xl sm:text-5xl font-serif tracking-wider">Hello, {user.name}</h1>
          </div>
          <button 
            onClick={logout}
            className="text-xs uppercase tracking-wider font-bold text-red-500 hover:underline"
          >
            Logout Session
          </button>
        </div>

        {/* Dashboard grid widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Loyalty Rewards Widget */}
          <div className="bg-white dark:bg-luxury-charcoal-800 p-6 border border-luxury-gold-500/10 rounded shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <Award className="w-8 h-8 text-luxury-gold-500" />
              <h3 className="font-serif text-lg">Legacy Rewards</h3>
              <p className="text-xs text-luxury-charcoal-400">Earn 10 points for every $100 spent. Redeem points on checkouts.</p>
            </div>
            <div>
              <span className="text-4xl font-serif font-bold text-luxury-gold-500">{user.loyaltyPoints}</span>
              <span className="text-[10px] text-luxury-charcoal-400 uppercase tracking-widest font-bold ml-2">Available Points</span>
            </div>
          </div>

          {/* Referral System Widget */}
          <div className="bg-white dark:bg-luxury-charcoal-800 p-6 border border-luxury-gold-500/10 rounded shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <Gift className="w-8 h-8 text-luxury-gold-500" />
              <h3 className="font-serif text-lg">Invite Colleagues</h3>
              <p className="text-xs text-luxury-charcoal-400">Refer a friend. They get 100 points, and you receive 150 points upon their first checkout.</p>
            </div>
            
            <div className="flex border border-luxury-gold-500/20 rounded overflow-hidden items-center bg-white/40 dark:bg-black/10">
              <span className="font-mono text-xs px-3 font-bold select-all flex-1">{user.referralCode}</span>
              <button 
                onClick={handleCopyCode}
                className="bg-luxury-charcoal-900 text-luxury-gold-500 p-2 hover:bg-luxury-gold-500 hover:text-luxury-charcoal-900 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* User Meta info */}
          <div className="bg-white dark:bg-luxury-charcoal-800 p-6 border border-luxury-gold-500/10 rounded shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <h3 className="font-serif text-lg">Client Profile</h3>
              <div className="space-y-1 text-xs text-luxury-charcoal-500 leading-relaxed">
                <p><span className="font-bold">Email:</span> {user.email}</p>
                <p><span className="font-bold">Privilege Tier:</span> {user.role === 'ADMIN' ? 'GOATHIDES Administrator' : 'Legacy Client'}</p>
              </div>
            </div>
            {user.role === 'ADMIN' && (
              <Link 
                href="/admin"
                className="w-full bg-luxury-gold-500 hover:bg-luxury-gold-600 text-luxury-charcoal-900 py-2.5 block text-center uppercase text-[10px] tracking-widest font-bold transition-all rounded"
              >
                Enter Admin Console
              </Link>
            )}
          </div>

        </div>

        {/* Order History */}
        <section className="space-y-4">
          <h2 className="text-2xl font-serif tracking-wider border-b border-luxury-gold-500/10 pb-2">Purchase History</h2>
          
          {loadingOrders ? (
            <div className="text-center font-serif text-xs py-10">Retracing past shipments...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 bg-white/40 dark:bg-black/10 rounded border border-luxury-gold-500/5">
              <p className="text-xs italic text-luxury-charcoal-405">No orders recorded yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div 
                  key={ord.id}
                  className="bg-white dark:bg-luxury-charcoal-800 p-6 border border-luxury-gold-500/5 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm"
                >
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-luxury-gold-500">{ord.orderNumber}</span>
                      <span className="text-luxury-charcoal-400">·</span>
                      <span className="text-luxury-charcoal-400">{ord.createdAt}</span>
                    </div>
                    <p className="text-luxury-charcoal-550">Payment: <span className="font-bold">{ord.paymentMethod}</span></p>
                  </div>
                  
                  <div className="flex gap-6 items-center">
                    <span className="font-bold text-sm text-luxury-charcoal-900 dark:text-luxury-ivory-100">{formatPrice(ord.total)}</span>
                    <span className="bg-luxury-gold-500/10 text-luxury-gold-500 font-bold px-3 py-1 rounded text-[10px] tracking-wider uppercase">{ord.status}</span>
                    <Link
                      href={`/track?order=${ord.orderNumber}`}
                      className="text-xs font-bold uppercase text-luxury-gold-500 hover:underline flex items-center gap-1"
                    >
                      Track <Truck className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      <Footer />
      <LiveChat />
    </>
  );
}
