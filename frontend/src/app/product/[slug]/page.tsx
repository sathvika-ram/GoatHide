'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import { useTranslation } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useCartWishlist } from '@/context/CartWishlistContext';
import { Star, ShieldCheck, Heart, RefreshCw, ChevronRight, CornerDownRight, Gift } from 'lucide-react';
import Link from 'next/link';
import { getStoreProduct, STORE_PRODUCTS } from '@/data/products';

interface Review {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  createdAt: string;
  user: { name: string };
}

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
  stock: number;
  reviews: Review[];
}

export default function ProductDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const { addToCart, toggleWishlist, isInWishlist, addToCompare, addRecentlyViewed } = useCartWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [frequentlyBought, setFrequentlyBought] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  // New review form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    setLoading(true);
    const selected = getStoreProduct(slug);
    if (selected) {
      const selectedProduct: Product = {
        ...selected,
        reviews: [{ id: `review-${selected.id}`, rating: 5, title: 'Exceptional craftsmanship', comment: `The detail on the ${selected.name} is outstanding.`, createdAt: new Date().toLocaleDateString(), user: { name: 'GOATHIDES Customer' } }],
      };
      setProduct(selectedProduct);
      setRelated(STORE_PRODUCTS.filter((item) => item.category === selected.category && item.id !== selected.id).map((item) => ({ ...item, reviews: [] })));
      setFrequentlyBought(STORE_PRODUCTS.filter((item) => item.category !== selected.category).slice(0, 2).map((item) => ({ ...item, reviews: [] })));
      addRecentlyViewed(slug);
    } else {
      setProduct(null);
      setRelated([]);
      setFrequentlyBought([]);
    }
    setActiveImg(0);
    setLoading(false);
  }, [slug]);

  const galleryImages = product?.images?.length ? product.images : ['/leather.jpg'];

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !reviewComment) return;
    setSubmittingReview(true);
    try {
      const token = localStorage.getItem('gh_token');
      const res = await fetch('http://localhost:5000/api/products/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          rating: reviewRating,
          title: reviewTitle,
          comment: reviewComment,
        }),
      });

      if (res.ok) {
        alert('Review submitted successfully. Reloading page.');
        window.location.reload();
      } else {
        throw new Error();
      }
    } catch {
      // Mock review add locally
      const localReview: Review = {
        id: `mock_r_${Date.now()}`,
        rating: reviewRating,
        title: reviewTitle,
        comment: reviewComment,
        createdAt: new Date().toLocaleDateString(),
        user: { name: 'Customer User' },
      };
      if (product) {
        const updatedReviews = [localReview, ...product.reviews];
        setProduct({ ...product, reviews: updatedReviews });
      }
      alert('Mock review added successfully.');
      setReviewTitle('');
      setReviewComment('');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleBuyBundle = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: '',
      slug: product.slug
    });
    if (frequentlyBought.length > 0) {
      addToCart({
        id: frequentlyBought[0].id,
        productId: frequentlyBought[0].id,
        name: frequentlyBought[0].name,
        price: frequentlyBought[0].price,
        image: '',
        slug: frequentlyBought[0].slug
      });
    }
    alert('Bundle items added to your cart.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-ivory-50 dark:bg-luxury-charcoal-900 flex items-center justify-center font-serif text-lg tracking-widest">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col justify-center items-center py-20 text-center">
          <h2 className="font-serif text-2xl mb-4">Product Not Found</h2>
          <Link href="/shop" className="text-luxury-gold-500 underline uppercase text-xs font-bold tracking-wider">Back to Shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 space-y-12 sm:space-y-16">
        
        {/* Product Overview Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Side: Images Gallery */}
          <div className="space-y-4">
              <div className="h-[320px] sm:h-[450px] bg-luxury-charcoal-100 dark:bg-luxury-charcoal-800 rounded relative overflow-hidden flex items-center justify-center text-center p-6 border border-luxury-gold-500/5">
                <span className="absolute text-[10px] uppercase font-mono tracking-widest text-luxury-gold-400 top-6 left-6">{product.sku}</span>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{ backgroundImage: `url(${galleryImages[activeImg]})` }}
                />
                <div className="relative z-10 text-luxury-ivory-50 font-serif font-bold text-lg backdrop-blur-sm">&nbsp;</div>
              </div>

              {/* Gallery thumbnails mapping if multiple images */}
              <div className="flex gap-4 overflow-x-auto">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 sm:w-20 h-16 sm:h-20 flex-shrink-0 bg-luxury-charcoal-100 dark:bg-luxury-charcoal-800 border rounded overflow-hidden ${
                      activeImg === i ? 'border-luxury-gold-500' : 'border-transparent'
                    } p-0`}
                  >
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
                  </button>
                ))}
              </div>
          </div>

          {/* Right Side: Product Details info */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-luxury-gold-500 uppercase">Premium Leather</span>
              <h1 className="text-3xl sm:text-5xl font-serif tracking-wider leading-tight text-luxury-charcoal-900 dark:text-luxury-ivory-50">{product.name}</h1>
              
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center text-luxury-gold-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  {product.rating}
                </div>
                <span className="text-luxury-charcoal-400">·</span>
                <span className="text-luxury-charcoal-500">{product.reviews.length} reviews</span>
                <span className="text-luxury-charcoal-400">·</span>
                <span className={`font-bold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {product.stock > 0 ? `${t('product.stock')} (${product.stock})` : t('product.outOfStock')}
                </span>
              </div>

              <div className="text-xl font-bold text-luxury-gold-500 pt-2">
                {formatPrice(product.price)}
                {product.compareAtPrice && (
                  <span className="text-sm text-luxury-charcoal-400 line-through ml-2 font-normal">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-luxury-charcoal-500 leading-relaxed pt-2">{product.description}</p>
            </div>

            {/* Specifications Box Accordion */}
            <div className="border border-luxury-gold-500/10 p-4 rounded-md space-y-3 bg-white/20 dark:bg-black/10">
              <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-luxury-gold-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Technical Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                {Object.keys(product.details).map((key) => (
                  <div key={key} className="flex flex-col border-b border-luxury-gold-500/5 py-1">
                    <span className="text-luxury-charcoal-400">{key}</span>
                    <span className="font-medium text-luxury-charcoal-800 dark:text-luxury-ivory-100">{product.details[key]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex border border-luxury-gold-500/20 rounded overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-luxury-gold-500/10 text-sm">-</button>
                <span className="px-6 py-3 font-semibold text-sm flex items-center justify-center bg-white/40 dark:bg-black/20 min-w-14">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-luxury-gold-500/10 text-sm">+</button>
              </div>

              <button
                onClick={() => addToCart({
                  id: product.id,
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images[0] || '/images/products/default.jpg',
                  slug: product.slug
                }, qty)}
                disabled={product.stock <= 0}
                className="flex-1 bg-luxury-charcoal-900 dark:bg-luxury-gold-500 hover:bg-luxury-gold-500 dark:hover:bg-luxury-gold-600 text-luxury-gold-500 hover:text-luxury-charcoal-900 dark:text-luxury-charcoal-900 dark:hover:text-luxury-charcoal-900 focus-visible:bg-luxury-gold-500 focus-visible:text-luxury-charcoal-900 font-bold py-3 uppercase text-xs tracking-wider transition-colors duration-300 rounded shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('cart.add')}
              </button>

              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 border border-luxury-gold-500/20 hover:border-luxury-gold-500/50 rounded transition-colors ${
                  isInWishlist(product.id) ? 'bg-red-500/10 text-red-500' : ''
                }`}
              >
                <Heart className="w-5 h-5" />
              </button>
              <button 
                onClick={() => addToCompare({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  slug: product.slug,
                  image: product.images[0] || '',
                  description: product.description,
                  sku: product.sku,
                  rating: product.rating,
                  details: product.details
                })}
                className="p-3 border border-luxury-gold-500/20 hover:border-luxury-gold-500/50 rounded transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Bundle */}
        {frequentlyBought.length > 0 && (
          <section className="border border-luxury-gold-500/20 p-6 rounded bg-luxury-gold-500/5 space-y-6">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-luxury-gold-500" />
              <h3 className="font-serif text-lg text-luxury-charcoal-900 dark:text-luxury-ivory-50">{t('product.boughtTogether')}</h3>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="bg-white dark:bg-luxury-charcoal-800 px-4 py-2 border rounded text-xs text-center font-bold">
                  {product.name}
                  <span className="block text-[10px] text-luxury-gold-500 font-semibold">{formatPrice(product.price)}</span>
                </div>
                <span className="text-xl font-bold">+</span>
                <div className="bg-white dark:bg-luxury-charcoal-800 px-4 py-2 border rounded text-xs text-center font-bold">
                  {frequentlyBought[0].name}
                  <span className="block text-[10px] text-luxury-gold-500 font-semibold">{formatPrice(frequentlyBought[0].price)}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-xs text-luxury-charcoal-400 block">Bundle Price</span>
                  <span className="text-lg font-bold text-luxury-gold-500">{formatPrice(product.price + frequentlyBought[0].price)}</span>
                </div>
                <button
                  onClick={handleBuyBundle}
                  className="bg-luxury-charcoal-900 text-luxury-gold-200 px-6 py-2.5 uppercase text-[10px] tracking-widest font-bold hover:bg-luxury-gold-500 hover:text-luxury-charcoal-900 transition-all rounded"
                >
                  Buy Both
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Care Guide - patina-preserving overlay */}
        <section className="relative rounded overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/leather.jpg')` }} />
          <div className="relative z-10 p-6 bg-gradient-to-t from-black/40 to-transparent">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-white">
                <h3 className="text-lg font-serif font-bold">Care Guide</h3>
                <p className="text-xs mt-2 text-luxury-ivory-100">Preserve the natural patina with gentle care: minimal water exposure, regular soft brushing, and conditioning using recommended products.</p>
              </div>
              <div className="flex-shrink-0">
                <img src="/goat.jpeg" alt="Care Guide" className="w-48 h-32 object-cover rounded opacity-80 border border-white/10" />
              </div>
            </div>
          </div>
        </section>

        {/* Product Reviews Log */}
        <section className="space-y-8">
          <h2 className="text-2xl font-serif tracking-wider border-b border-luxury-gold-500/10 pb-3">{t('product.reviews')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Reviews list */}
            <div className="md:col-span-2 space-y-6">
              {product.reviews.length === 0 ? (
                <p className="text-xs italic text-luxury-charcoal-400">Be the first to review this exquisite piece.</p>
              ) : (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="border-b border-luxury-gold-500/5 pb-4 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold">{rev.user.name}</span>
                      <span className="text-luxury-charcoal-400">{rev.createdAt}</span>
                    </div>
                    <div className="flex text-luxury-gold-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    {rev.title && <h4 className="font-serif text-sm font-semibold">{rev.title}</h4>}
                    <p className="text-xs text-luxury-charcoal-500 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Write a review form */}
            <div className="bg-white/40 dark:bg-black/10 border border-luxury-gold-500/10 p-6 rounded">
              <h3 className="font-serif text-base mb-4">{t('product.writeReview')}</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-luxury-gold-500">Rating</label>
                  <select 
                    value={reviewRating}
                    onChange={(e) => setReviewRating(parseInt(e.target.value))}
                    className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-2 text-xs focus:outline-none rounded"
                  >
                    <option value="5">5 Stars (Exquisite)</option>
                    <option value="4">4 Stars (Excellent)</option>
                    <option value="3">3 Stars (Good)</option>
                    <option value="2">2 Stars (Average)</option>
                    <option value="1">1 Star (Disappointing)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-luxury-gold-500">Review Title</label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. Masterful Stitching"
                    className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-2 text-xs focus:outline-none text-luxury-charcoal-900 dark:text-luxury-ivory-100 rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-luxury-gold-500">Review Comments</label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Provide details about the finish, feel, and usability..."
                    rows={4}
                    className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-2 text-xs focus:outline-none text-luxury-charcoal-900 dark:text-luxury-ivory-100 rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full bg-luxury-charcoal-900 text-luxury-gold-200 py-3 text-xs uppercase font-bold tracking-wider hover:bg-luxury-gold-500 hover:text-luxury-charcoal-900 transition-colors rounded"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <LiveChat />
    </>
  );
}
