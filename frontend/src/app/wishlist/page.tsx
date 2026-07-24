'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import { useTranslation } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useCartWishlist } from '@/context/CartWishlistContext';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  sku: string;
}

export default function Wishlist() {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const { wishlist, toggleWishlist, addToCart } = useCartWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      setLoading(true);
      try {
        // Query full product database
        const res = await fetch('http://localhost:5000/api/products');
        if (res.ok) {
          const data: Product[] = await res.json();
          const filtered = data.filter((p) => wishlist.includes(p.id));
          setProducts(filtered);
        } else {
          throw new Error();
        }
      } catch {
        // Local mockup database fallback
        const MOCK_DB = [
          { id: '1', name: "The Aurelia Satchel", slug: "the-aurelia-satchel", description: "Full-grain goat leather luxury handbag with gold hardware.", price: 850.00, images: [], sku: "GH-HB-AURELIA-01" },
          { id: '2', name: "The Celestia Tote", slug: "the-celestia-tote", description: "Vegetable tanned daily work satchel purse.", price: 680.00, images: [], sku: "GH-HB-CELESTIA-02" },
          { id: '3', name: "The Sovereign Briefcase", slug: "the-sovereign-briefcase", description: "Saffiano laptop organizer bag 16-inch compartment.", price: 950.00, images: [], sku: "GH-LB-SOVEREIGN-01" }
        ];
        setProducts(MOCK_DB.filter(p => wishlist.includes(p.id)));
      } finally {
        setLoading(false);
      }
    };
    fetchWishlistItems();
  }, [wishlist]);

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1">
        <h1 className="text-3xl sm:text-5xl font-serif tracking-wider mb-8">My Wishlist</h1>

        {loading ? (
          <div className="h-64 flex justify-center items-center font-serif tracking-widest text-sm">Synchronizing Wishlist...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white/40 dark:bg-black/10 border border-luxury-gold-500/10 rounded">
            <Heart className="w-12 h-12 mx-auto text-luxury-gold-200 mb-4" />
            <p className="font-serif italic text-luxury-charcoal-400">Your wishlist is currently empty.</p>
            <Link 
              href="/shop"
              className="mt-6 inline-block bg-luxury-gold-500 hover:bg-luxury-gold-600 text-luxury-charcoal-900 font-bold uppercase text-[10px] tracking-widest px-6 py-2.5 rounded transition-all duration-300"
            >
              Shop Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div 
                key={prod.id}
                className="bg-white dark:bg-luxury-charcoal-800 border border-luxury-gold-500/5 rounded p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 bg-luxury-charcoal-100 dark:bg-luxury-charcoal-900 flex items-center justify-center text-center p-4 rounded text-xs">
                    {prod.name}
                  </div>
                  <h3 className="font-serif text-base mt-4">{prod.name}</h3>
                  <p className="text-xs text-luxury-gold-500 font-bold mt-1">{formatPrice(prod.price)}</p>
                  <p className="text-xs text-luxury-charcoal-500 mt-2 line-clamp-2">{prod.description}</p>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => addToCart({
                      id: prod.id,
                      productId: prod.id,
                      name: prod.name,
                      price: prod.price,
                      image: prod.images[0] || '',
                      slug: prod.slug
                    })}
                    className="flex-1 bg-luxury-charcoal-900 hover:bg-luxury-gold-500 text-luxury-gold-500 hover:text-luxury-charcoal-900 py-2.5 uppercase text-[10px] font-bold tracking-widest transition-colors duration-300 rounded flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(prod.id)}
                    className="p-2 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-red-500 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <LiveChat />
    </>
  );
}
