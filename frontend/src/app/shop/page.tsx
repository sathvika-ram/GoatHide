'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import { useTranslation } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useCartWishlist, ProductDetail } from '@/context/CartWishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, SlidersHorizontal, Search, RefreshCw, ShoppingBag, Eye, Heart, X } from 'lucide-react';
import Link from 'next/link';
import { STORE_PRODUCTS } from '@/data/products';

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

const CATEGORIES = [
  { name: "All Products", slug: "" },
  { name: "Women's Handbags", slug: "luxury-womens-handbags" },
  { name: "Laptop Bags", slug: "luxury-laptop-bags" },
  { name: "Leather Wallets", slug: "leather-wallets" },
  { name: "Leather Belts", slug: "leather-belts" },
  { name: "Leather Jackets", slug: "leather-jackets" },
  { name: "Duffel Bags", slug: "duffel-bags" },
  { name: "Passport Covers", slug: "passport-covers" },
  { name: "Card Holders", slug: "card-holders" },
  { name: "Formal Shoes", slug: "formal-shoes" },
  { name: "Loafers", slug: "loafers" },
  { name: "Accessories", slug: "accessories" },
];

function ShopContent() {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const { addToCart, toggleWishlist, isInWishlist, comparedProducts, addToCompare, removeFromCompare, clearCompare } = useCartWishlist();
  
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchVal, setSearchVal] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sort') || 'new');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navbar and footer collection links update the URL while this page remains mounted.
  // Mirror those URL values into the filter state so the matching products render immediately.
  useEffect(() => {
    setSearchVal(searchParams.get('search') || '');
    setActiveCategory(searchParams.get('category') || '');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setSortOrder(searchParams.get('sort') || 'new');
  }, [searchParams]);

  const fetchFilteredProducts = async () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (searchVal) query.set('search', searchVal);
    if (activeCategory) query.set('category', activeCategory);
    if (minPrice) query.set('minPrice', minPrice);
    if (maxPrice) query.set('maxPrice', maxPrice);
    if (sortOrder) query.set('sort', sortOrder);

    try {
      const res = await fetch(`http://localhost:5000/api/products?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        throw new Error();
      }
    } catch {
      // Offline local search and filter logic fallback
      const MOCK_PRODUCTS: Product[] = [
        { id: '1', name: "The Aurelia Satchel", slug: "the-aurelia-satchel", description: "Full-grain goat leather luxury handbag with gold hardware.", price: 850.00, compareAtPrice: 950.00, rating: 4.8, images: ["/aurelia.jpg"], sku: "GH-HB-AURELIA-01", details: { Material: "French Goat Leather", Size: "28cm x 20cm", Origin: "Italy" } },
        { id: '2', name: "The Celestia Tote", slug: "the-celestia-tote", description: "Vegetable tanned daily work satchel purse.", price: 680.00, rating: 4.5, images: ["/tote.jpg"], sku: "GH-HB-CELESTIA-02", details: { Material: "Premium Goat Hide", Size: "38cm x 30cm", Origin: "Austria" } },
        { id: '3', name: "The Sovereign Briefcase", slug: "the-sovereign-briefcase", description: "Saffiano laptop organizer bag 16-inch compartment.", price: 950.00, compareAtPrice: 1100.00, rating: 4.9, images: ["/briefcase.jpg"], sku: "GH-LB-SOVEREIGN-01", details: { Material: "Saffiano Leather", Size: "40cm x 29cm", Origin: "Germany" } },
        { id: '4', name: "The Vanguard Bifold", slug: "the-vanguard-bifold", description: "RFID shielding billfold with cash divider.", price: 180.00, rating: 4.7, images: ["/bifold.jpg"], sku: "GH-WA-VANGUARD-01", details: { Material: "Pebbled Leather", Size: "11cm x 9cm", Origin: "France" } },
        { id: '5', name: "The Heritage Classic Belt", slug: "the-heritage-classic-belt", description: "Bonded double grain gold-accented dress belt.", price: 120.00, rating: 4.4, images: ["/heritagebelt.jpg"], sku: "GH-BT-HERITAGE-01", details: { Material: "Saddle Leather", Size: "35mm Width", Origin: "Spain" } },
        { id: '6', name: "The Icon Cafe Racer Jacket", slug: "the-icon-cafe-racer", description: "Classic retro styled luxury biker outwear.", price: 1200.00, compareAtPrice: 1450.00, rating: 4.9, images: ["/jacket.jpg"], sku: "GH-JK-ICERACER-01", details: { Material: "1.2mm Drum-Dyed Leather", Size: "Slim Fit", Origin: "Italy" } },
        { id: '7', name: "The Odyssey Weekender", slug: "the-odyssey-weekender", description: "45 Liters airport standard carry-on duffel travel bag.", price: 1100.00, rating: 4.8, images: ["/duffel.jpg"], sku: "GH-DF-ODYSSEY-01", details: { Material: "Heavy Canvas & Leather", Size: "50cm x 28cm", Origin: "United Kingdom" } },
        { id: '8', name: "The Sterling Oxford", slug: "the-sterling-oxford", description: "Cap-toe handcrafted blake stitch leather oxford dress shoes.", price: 450.00, compareAtPrice: 520.00, rating: 4.8, images: ["/shoe.jpg"], sku: "GH-SH-STERLING-01", details: { Material: "Hand-Colored Hide", Size: "Standard sizing", Origin: "Italy" } }
      ];

      let filtered = [...MOCK_PRODUCTS];

      if (searchVal) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchVal.toLowerCase()) || p.description.toLowerCase().includes(searchVal.toLowerCase()));
      }
      if (activeCategory) {
        // Simple logic: we match keywords for MOCK category slug
        if (activeCategory.includes('handbag')) filtered = filtered.filter(p => p.slug.includes('satchel') || p.slug.includes('tote'));
        else if (activeCategory.includes('laptop')) filtered = filtered.filter(p => p.slug.includes('briefcase'));
        else if (activeCategory.includes('wallet')) filtered = filtered.filter(p => p.slug.includes('bifold'));
        else if (activeCategory.includes('belt')) filtered = filtered.filter(p => p.slug.includes('belt'));
        else if (activeCategory.includes('jacket')) filtered = filtered.filter(p => p.slug.includes('racer'));
        else if (activeCategory.includes('duffel')) filtered = filtered.filter(p => p.slug.includes('weekender'));
        else if (activeCategory.includes('shoes') || activeCategory.includes('loafer')) filtered = filtered.filter(p => p.slug.includes('oxford'));
      }
      if (minPrice) filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
      if (maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));

      if (sortOrder === 'price_asc') filtered.sort((a, b) => a.price - b.price);
      else if (sortOrder === 'price_desc') filtered.sort((a, b) => b.price - a.price);
      else if (sortOrder === 'rating') filtered.sort((a, b) => b.rating - a.rating);

      setProducts(filtered);
    } finally {
      setLoading(false);
    }
  };

  // Keep browsing instant and predictable even when the API is unavailable.
  const filterLocalProducts = () => {
    setLoading(true);
    let filtered = [...STORE_PRODUCTS];

    if (searchVal) {
      const query = searchVal.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
      );
    }
    if (activeCategory) {
      const accessoryCategories = ['leather-wallets', 'leather-belts', 'passport-covers', 'card-holders', 'accessories'];
      filtered = activeCategory === 'accessories'
        ? filtered.filter((product) => accessoryCategories.includes(product.category))
        : filtered.filter((product) => product.category === activeCategory);
    }
    if (minPrice) filtered = filtered.filter((product) => product.price >= Number(minPrice));
    if (maxPrice) filtered = filtered.filter((product) => product.price <= Number(maxPrice));
    if (sortOrder === 'price_asc') filtered.sort((a, b) => a.price - b.price);
    else if (sortOrder === 'price_desc') filtered.sort((a, b) => b.price - a.price);
    else if (sortOrder === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    setProducts(filtered);
    setLoading(false);
  };

  useEffect(() => {
    filterLocalProducts();
  }, [searchVal, activeCategory, minPrice, maxPrice, sortOrder]);

  const updateUrl = (key: string, val: string) => {
    const params = new URLSearchParams(window.location.search);
    if (val) params.set(key, val);
    else params.delete(key);
    router.replace(`/shop?${params.toString()}`);
  };

  const handleCategorySelect = (slug: string) => {
    setActiveCategory(slug);
    updateUrl('category', slug);
  };

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-10 flex-1">
        {/* Banner Title */}
        <div className="border-b border-luxury-gold-500/10 pb-8 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl sm:text-5xl font-serif tracking-wider">GOATHIDES Shop</h1>
            <p className="text-xs text-luxury-charcoal-400 mt-2">Showing {products.length} luxury leather goods</p>
          </div>
          {/* Mobile Filter Button */}
          <button 
            onClick={() => setSidebarOpen(true)}
            className="md:hidden flex items-center gap-2 bg-luxury-charcoal-900 text-luxury-gold-200 px-4 py-2 uppercase text-xs font-bold tracking-wider rounded"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Layout Grid */}
        <div className="flex gap-10">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden md:block w-64 flex-shrink-0 space-y-8">
            {/* Search Keyword */}
            <div className="space-y-3">
              <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-luxury-gold-500">Search Products</h3>
              <div className="flex border border-luxury-gold-500/20 px-3 py-2 rounded items-center bg-white/40 dark:bg-black/10">
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => { setSearchVal(e.target.value); updateUrl('search', e.target.value); }}
                  placeholder="Keywords..."
                  className="bg-transparent focus:outline-none text-xs flex-1 text-luxury-charcoal-800 dark:text-luxury-ivory-100 placeholder-luxury-charcoal-400"
                />
                <Search className="w-4 h-4 text-luxury-charcoal-400" />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-luxury-gold-500">Categories</h3>
              <ul className="space-y-2 text-xs">
                {CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <button
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`text-left w-full transition-colors ${
                        activeCategory === cat.slug 
                          ? 'text-luxury-gold-500 font-bold' 
                          : 'text-luxury-charcoal-500 hover:text-luxury-gold-500'
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
              <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-luxury-gold-500">Price Range</h3>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min ($)"
                  value={minPrice}
                  onChange={(e) => { setMinPrice(e.target.value); updateUrl('minPrice', e.target.value); }}
                  className="w-full bg-transparent border border-luxury-gold-500/20 px-2 py-1.5 text-xs text-center rounded placeholder-luxury-charcoal-400 focus:outline-none focus:border-luxury-gold-500"
                />
                <span className="text-luxury-charcoal-400 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max ($)"
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(e.target.value); updateUrl('maxPrice', e.target.value); }}
                  className="w-full bg-transparent border border-luxury-gold-500/20 px-2 py-1.5 text-xs text-center rounded placeholder-luxury-charcoal-400 focus:outline-none focus:border-luxury-gold-500"
                />
              </div>
            </div>

            {/* Sorting */}
            <div className="space-y-3">
              <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-luxury-gold-500">Sort By</h3>
              <select
                value={sortOrder}
                onChange={(e) => { setSortOrder(e.target.value); updateUrl('sort', e.target.value); }}
                className="w-full bg-transparent border border-luxury-gold-500/20 px-2 py-2 text-xs focus:outline-none rounded"
              >
                <option value="new" className="bg-luxury-ivory-50 dark:bg-luxury-charcoal-900">New Arrivals</option>
                <option value="price_asc" className="bg-luxury-ivory-50 dark:bg-luxury-charcoal-900">Price: Low to High</option>
                <option value="price_desc" className="bg-luxury-ivory-50 dark:bg-luxury-charcoal-900">Price: High to Low</option>
                <option value="rating" className="bg-luxury-ivory-50 dark:bg-luxury-charcoal-900">Highest Rated</option>
              </select>
            </div>
          </aside>

          {/* Product Listing Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="h-[380px] bg-luxury-charcoal-100 dark:bg-luxury-charcoal-800 rounded" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white/40 dark:bg-black/10 border border-luxury-gold-500/5 rounded">
                <SlidersHorizontal className="w-12 h-12 mx-auto text-luxury-gold-200 mb-4" />
                <h3 className="font-serif text-lg tracking-wider">No Products Found</h3>
                <p className="text-xs text-luxury-charcoal-400 max-w-xs mx-auto mt-2">Adjust your pricing filters or category select to explore additional options.</p>
                <button
                  onClick={() => {
                    setSearchVal('');
                    setActiveCategory('');
                    setMinPrice('');
                    setMaxPrice('');
                    setSortOrder('new');
                    router.replace('/shop');
                  }}
                  className="mt-6 bg-luxury-gold-500 text-luxury-charcoal-900 px-6 py-2 uppercase text-[10px] tracking-widest font-bold rounded"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((prod) => (
                  <div 
                    key={prod.id} 
                    className="group bg-white dark:bg-luxury-charcoal-800 border border-luxury-gold-500/5 hover:border-luxury-gold-500/20 hover:shadow-luxury transition-all duration-500 flex flex-col rounded overflow-hidden relative"
                  >
                    <div className="h-64 bg-luxury-charcoal-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center bg-zinc-300 dark:bg-zinc-800 flex items-center justify-center text-luxury-charcoal-700 font-bold p-6 text-center text-xs">
                        {prod.name}
                      </div>
                      
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${prod.images[0] || '/leather.jpg'})` }}
                      />

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
                          className="bg-luxury-charcoal-900 hover:bg-luxury-gold-500 text-luxury-gold-500 hover:text-luxury-charcoal-900 p-2 transition-colors duration-300 rounded"
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
        </div>
      </main>

      {/* Comparison Drawer Panel */}
      <AnimatePresence>
        {comparedProducts.length > 0 && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 bg-luxury-ivory-50 dark:bg-luxury-charcoal-900 border-t border-luxury-gold-500/20 shadow-2xl z-40 p-6"
          >
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-luxury-gold-500/10 pb-2">
                <h3 className="font-serif text-sm font-semibold tracking-wider text-luxury-gold-500">Product Comparison Console ({comparedProducts.length}/3)</h3>
                <button onClick={clearCompare} className="text-xs uppercase tracking-wider font-bold hover:text-red-500 flex items-center gap-1">
                  <X className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {comparedProducts.map((p) => (
                  <div key={p.id} className="relative bg-white dark:bg-luxury-charcoal-800 p-4 border border-luxury-gold-500/5 rounded flex flex-col justify-between">
                    <button 
                      onClick={() => removeFromCompare(p.id)}
                      className="absolute top-2 right-2 text-luxury-charcoal-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div>
                      <h4 className="font-serif text-sm font-bold truncate pr-6">{p.name}</h4>
                      <p className="text-xs text-luxury-gold-500 font-bold mt-1">{formatPrice(p.price)}</p>
                      
                      <div className="mt-4 space-y-2 text-[10px]">
                        <div className="flex justify-between border-b border-luxury-gold-500/5 py-1">
                          <span className="text-luxury-charcoal-400">SKU</span>
                          <span className="font-mono">{p.sku}</span>
                        </div>
                        <div className="flex justify-between border-b border-luxury-gold-500/5 py-1">
                          <span className="text-luxury-charcoal-400">Rating</span>
                          <span className="font-medium flex items-center"><Star className="w-3 h-3 text-luxury-gold-500 fill-current mr-0.5" />{p.rating}</span>
                        </div>
                        {p.details && Object.keys(p.details).map((key) => (
                          <div key={key} className="flex justify-between border-b border-luxury-gold-500/5 py-1">
                            <span className="text-luxury-charcoal-400">{key}</span>
                            <span className="font-medium truncate max-w-[150px]">{p.details[key]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => addToCart({
                        id: p.id,
                        productId: p.id,
                        name: p.name,
                        price: p.price,
                        image: p.image,
                        slug: p.slug
                      })}
                      className="mt-6 w-full bg-luxury-charcoal-900 hover:bg-luxury-gold-500 text-luxury-gold-500 hover:text-luxury-charcoal-900 font-bold py-2 uppercase text-[10px] tracking-wider transition-colors duration-300 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <LiveChat />
    </>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-serif text-lg tracking-widest bg-luxury-ivory-50 dark:bg-luxury-charcoal-900">Loading GOATHIDES...</div>}>
      <ShopContent />
    </Suspense>
  );
}
