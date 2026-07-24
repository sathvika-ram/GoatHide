'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import { useTranslation } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useCartWishlist } from '@/context/CartWishlistContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, RefreshCw, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  images: string[];
  details: Record<string, string>;
  sku: string;
}

const productImageBySlug: Record<string, string> = {
  'the-aurelia-satchel': '/aurelia.jpg',
  'the-sovereign-briefcase': '/briefcase.jpg',
  'the-vanguard-bifold': '/bifold.jpg',
  'the-icon-cafe-racer': '/jacket.jpg',
};

export default function Home() {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const { addToCart, toggleWishlist, isInWishlist, addToCompare } = useCartWishlist();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products
    const fetchFeatured = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products?featured=true');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          throw new Error();
        }
      } catch (e) {
        // Fallback mock featured products
        setProducts([
          {
            id: '1',
            name: "The Aurelia Satchel",
            slug: "the-aurelia-satchel",
            description: "Full-grain goat leather luxury handbag.",
            price: 850.00,
            compareAtPrice: 950.00,
            rating: 4.8,
            images: ["/aurelia.jpg"],
            sku: "GH-HB-AURELIA-01",
            details: { Material: "Goat Leather" }
          },
          {
            id: '3',
            name: "The Sovereign Briefcase",
            slug: "the-sovereign-briefcase",
            description: "Accommodates up to a 16-inch laptop in a padded sleeve.",
            price: 950.00,
            rating: 4.9,
            images: ["/briefcase.jpg"],
            sku: "GH-LB-SOVEREIGN-01",
            details: { Material: "Saffiano Goat Leather" }
          },
          {
            id: '4',
            name: "The Vanguard Bifold",
            slug: "the-vanguard-bifold",
            description: "RFID blocking slim bifold wallet.",
            price: 180.00,
            rating: 4.7,
            images: ["/bifold.jpg"],
            sku: "GH-WA-VANGUARD-01",
            details: { Material: "French Goat Leather" }
          },
          {
            id: '6',
            name: "The Icon Cafe Racer Jacket",
            slug: "the-icon-cafe-racer",
            description: "Asymmetrical zip classic cafe racer jacket.",
            price: 1200.00,
            compareAtPrice: 1450.00,
            rating: 4.9,
            images: ["/jacket.jpg"],
            sku: "GH-JK-ICERACER-01",
            details: { Material: "Drum-Dyed Leather" }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Luxury Hero Banner */}
        <section className="relative h-[85vh] bg-zinc-900 overflow-hidden flex items-center justify-center text-center">
          {/* Subtle slow image scaling background */}
          <div className="absolute inset-0 bg-cover bg-center opacity-40 bg-[url('/leather.jpg')] scale-105 animate-[scaleUp_30s_infinite_alternate]" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal-900 via-transparent to-black/50" />

          <div className="relative z-10 max-w-4xl px-6 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-luxury-gold-400 font-serif text-sm tracking-[0.3em] uppercase"
            >
              {t('common.atelier')}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-4xl sm:text-6xl font-serif tracking-wider text-luxury-ivory-50 leading-tight"
            >
              {t('home.heroTitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="text-luxury-charcoal-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed"
            >
              {t('home.heroSubtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="pt-4"
            >
              <Link
                href="/shop"
                className="inline-block bg-luxury-gold-500 hover:bg-luxury-gold-600 text-luxury-charcoal-900 font-bold uppercase text-xs tracking-[0.2em] px-8 py-4 transition-colors duration-300 rounded shadow-luxury"
              >
                {t('home.shopNow')}
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Categories Spotlight */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 space-y-10 sm:space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-4xl font-serif tracking-wider text-luxury-charcoal-900 dark:text-luxury-ivory-50">{t('common.shopByCategory')}</h2>
            <p className="text-xs text-luxury-charcoal-500 max-w-md mx-auto">{t('common.shopByCategorySub')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: t('common.catHandbags'), slug: "luxury-womens-handbags", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400" },
              { name: t('common.catBriefcases'), slug: "luxury-laptop-bags", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400" },
              { name: t('common.catWallets'), slug: "leather-wallets", img: "/Wallet.jpg" },
              { name: t('common.catAccessories'), slug: "accessories", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400" },
            ].map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/shop?category=${cat.slug}`}
                className="group relative h-80 overflow-hidden bg-luxury-charcoal-900 rounded"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700" 
                  style={{ backgroundImage: `url(${cat.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <h3 className="font-serif text-lg text-luxury-ivory-50 group-hover:text-luxury-gold-400 transition-colors">{cat.name}</h3>
                    <span className="text-[10px] uppercase tracking-wider text-luxury-charcoal-400">{t('common.viewCollection')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products Grid */}
        <section className="bg-luxury-ivory-100/50 dark:bg-black/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-4xl font-serif tracking-wider text-luxury-charcoal-900 dark:text-luxury-ivory-50">{t('home.featured')}</h2>
              <p className="text-xs text-luxury-charcoal-500">{t('home.featuredSub')}</p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="h-[380px] bg-luxury-charcoal-100 dark:bg-luxury-charcoal-800 rounded" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {products.map((prod) => (
                  <div 
                    key={prod.id} 
                    className="group bg-white dark:bg-luxury-charcoal-800 border border-luxury-gold-500/5 hover:border-luxury-gold-500/20 hover:shadow-luxury transition-all duration-500 flex flex-col rounded overflow-hidden relative"
                  >
                    {/* Media Block / Image Container */}
                    <div className="h-64 bg-luxury-charcoal-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center bg-zinc-300 dark:bg-zinc-800 flex items-center justify-center text-luxury-charcoal-700 font-bold p-6 text-center text-xs">
                        {prod.name}
                      </div>
                      
                      {/* Image hover zooming effect */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${productImageBySlug[prod.slug] || prod.images[0] || '/leather.jpg'})` }}
                      />

                      {/* Quick Actions Panel */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                        <button 
                          onClick={() => toggleWishlist(prod.id)}
                          className={`p-2 rounded-full shadow-md transition-colors ${
                            isInWishlist(prod.id) 
                              ? 'bg-red-500 text-white' 
                              : 'bg-white dark:bg-luxury-charcoal-900 text-luxury-charcoal-800 dark:text-luxury-ivory-100 hover:text-red-500'
                          }`}
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => addToCompare({
                            id: prod.id,
                            name: prod.name,
                            price: prod.price,
                            slug: prod.slug,
                            image: prod.images[0] || '',
                            description: prod.description,
                            sku: prod.sku,
                            rating: prod.rating,
                            details: prod.details
                          })}
                          className="p-2 bg-white dark:bg-luxury-charcoal-900 text-luxury-charcoal-800 dark:text-luxury-ivory-100 hover:text-luxury-gold-500 rounded-full shadow-md transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <Link 
                          href={`/product/${prod.slug}`}
                          className="p-2 bg-white dark:bg-luxury-charcoal-900 text-luxury-charcoal-800 dark:text-luxury-ivory-100 hover:text-luxury-gold-500 rounded-full shadow-md transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-serif text-sm font-semibold tracking-wide group-hover:text-luxury-gold-500 transition-colors duration-300 line-clamp-1">
                            <Link href={`/product/${prod.slug}`}>{prod.name}</Link>
                          </h3>
                          <div className="flex items-center text-[10px] text-luxury-gold-500 font-bold">
                            <Star className="w-3 h-3 fill-current mr-0.5" />
                            {prod.rating}
                          </div>
                        </div>
                        <p className="text-xs text-luxury-charcoal-500 line-clamp-2 mt-1">{prod.description}</p>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-bold text-sm text-luxury-gold-500">
                          {formatPrice(prod.price)}
                          {prod.compareAtPrice && (
                            <span className="text-[10px] text-luxury-charcoal-400 line-through ml-2 font-normal">
                              {formatPrice(prod.compareAtPrice)}
                            </span>
                          )}
                        </span>
                        
                        <button
                          onClick={() => addToCart({
                            id: prod.id,
                            productId: prod.id,
                            name: prod.name,
                            price: prod.price,
                            image: prod.images[0] || '',
                            slug: prod.slug
                          })}
                          aria-label={`Add ${prod.name} to cart`}
                          className="bg-luxury-charcoal-900 hover:bg-luxury-gold-500 text-luxury-gold-500 hover:text-luxury-charcoal-900 focus-visible:bg-luxury-gold-500 focus-visible:text-luxury-charcoal-900 p-2 transition-colors duration-300 rounded"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Brand Legacy / Craftsmanship pitch */}
        <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase text-luxury-gold-500 tracking-widest">Heritage & Legacy</span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-wider text-luxury-charcoal-900 dark:text-luxury-ivory-50 leading-tight">
              Honoring Italian Leathercraft Tradition
            </h2>
            <p className="text-xs sm:text-sm text-luxury-charcoal-500 leading-relaxed">
              Every GOATHIDES creation is born from full-grain hides, meticulously cured using vegetable bark extracts in family-owned Italian tanneries. The process takes up to 40 days, yielding a robust, organic material that inherits a beautiful individual patina, recording your unique journey over time.
            </p>
            <div className="flex gap-6 pt-4">
              <Link 
                href="/craftsmanship"
                className="text-xs uppercase tracking-wider font-bold text-luxury-gold-500 hover:underline"
              >
                Our Workshop
              </Link>
              <Link 
                href="/leather-care"
                className="text-xs uppercase tracking-wider font-bold text-luxury-gold-500 hover:underline"
              >
                Leather Care Guide
              </Link>
            </div>
          </div>
          <div className="relative h-[450px] bg-luxury-charcoal-100 overflow-hidden rounded shadow-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-[url('/ledor.jpg')]"
            />
          </div>
        </section>
      </main>

      <Footer />
      <LiveChat />
    </>
  );
}
