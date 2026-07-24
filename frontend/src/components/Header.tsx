'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';
import { useCurrency, Currency } from '@/context/CurrencyContext';
import { useCountry } from '@/context/CountryContext';
import { COUNTRY_SETTINGS, CountryCode } from '@/config/countrySettings';
import { useAuth } from '@/context/AuthContext';
import { useCartWishlist } from '@/context/CartWishlistContext';
import { Locale } from '@/locales/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User, Search, Globe, ChevronDown, Trash2, Heart, RefreshCw } from 'lucide-react';

export const Header: React.FC = () => {
  const { locale, t } = useTranslation();
  const { currency, formatPrice } = useCurrency();
  const { country, setCountry, setLocaleForCountry, setCurrencyForCountry } = useCountry();
  const { user, logout } = useAuth();
  const { cart, removeFromCart, updateQuantity, getCartTotal, getDiscountAmount, getFinalTotal, comparedProducts, clearCompare } = useCartWishlist();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const countryBannerKey = `country.${country}.banner`;
  const countryBanner = t(countryBannerKey);
  const topBannerText = countryBanner !== countryBannerKey ? countryBanner : t('home.heroTitle');

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value as CountryCode);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocaleForCountry(e.target.value as Locale);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrencyForCountry(e.target.value as Currency);
  };

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-luxury-charcoal-900 text-luxury-gold-200 text-xs py-2 px-6 flex justify-between items-center border-b border-luxury-gold-900/30 gap-4">
        <div>{topBannerText}</div>
        <div className="flex gap-4 items-center flex-wrap justify-end">
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-luxury-gold-400" />
            <select
              value={country}
              onChange={handleCountryChange}
              className="bg-transparent text-luxury-gold-200 border-none outline-none cursor-pointer focus:ring-0 text-xs"
            >
              {(Object.entries(COUNTRY_SETTINGS) as [CountryCode, (typeof COUNTRY_SETTINGS)[CountryCode]][]).map(
                ([code, settings]) => (
                  <option key={code} value={code} className="bg-luxury-charcoal-900">
                    {settings.label}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex items-center gap-1 border-l border-luxury-charcoal-700 pl-3">
            <select
              value={locale}
              onChange={handleLanguageChange}
              className="bg-transparent text-luxury-gold-200 border-none outline-none cursor-pointer focus:ring-0 text-xs"
            >
              <option value="en" className="bg-luxury-charcoal-900">EN</option>
              <option value="fr" className="bg-luxury-charcoal-900">FR</option>
              <option value="de" className="bg-luxury-charcoal-900">DE</option>
              <option value="es" className="bg-luxury-charcoal-900">ES</option>
              <option value="it" className="bg-luxury-charcoal-900">IT</option>
              <option value="ar" className="bg-luxury-charcoal-900">العربية</option>
              <option value="hi" className="bg-luxury-charcoal-900">हिन्दी</option>
              <option value="te" className="bg-luxury-charcoal-900">తెలుగు</option>
              <option value="ja" className="bg-luxury-charcoal-900">日本語</option>
              <option value="zh" className="bg-luxury-charcoal-900">中文</option>
            </select>
          </div>

          <div className="flex items-center gap-1 border-l border-luxury-charcoal-700 pl-3">
            <select
              value={currency}
              onChange={handleCurrencyChange}
              className="bg-transparent text-luxury-gold-200 border-none outline-none cursor-pointer focus:ring-0 text-xs"
            >
              <option value="USD" className="bg-luxury-charcoal-900">USD ($)</option>
              <option value="EUR" className="bg-luxury-charcoal-900">EUR (€)</option>
              <option value="GBP" className="bg-luxury-charcoal-900">GBP (£)</option>
              <option value="INR" className="bg-luxury-charcoal-900">INR (₹)</option>
              <option value="JPY" className="bg-luxury-charcoal-900">JPY (¥)</option>
              <option value="AED" className="bg-luxury-charcoal-900">AED (د.إ)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header className="sticky top-0 z-40 bg-luxury-ivory-50/80 dark:bg-luxury-charcoal-900/80 backdrop-blur-md border-b border-luxury-gold-500/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-luxury-charcoal-800 dark:text-luxury-ivory-100 hover:text-luxury-gold-500"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Luxury Logo */}
          <div className="flex-1 md:flex-initial text-center md:text-left">
            <Link href="/" className="group inline-flex items-center gap-3">
              <Image
                src="/goat.jpeg"
                alt="GOATHIDES logo"
                width={44}
                height={44}
                className="rounded-full object-cover border border-luxury-gold-500/30"
              />
              <span className="font-serif text-2xl tracking-[0.25em] font-medium text-luxury-charcoal-900 dark:text-luxury-ivory-50 group-hover:text-luxury-gold-500 transition-colors duration-300">
                GOATHIDES
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Menu (Mega Menu Inspired) */}
          <nav className="hidden md:flex gap-8 items-center text-sm font-medium tracking-widest text-luxury-charcoal-700 dark:text-luxury-ivory-100 uppercase">
            <Link href="/" className="hover:text-luxury-gold-500 transition-colors py-2">{t('nav.home')}</Link>
            
            {/* Mega Menu Toggle Link */}
            <div className="relative group">
              <Link href="/shop" className="hover:text-luxury-gold-500 transition-colors py-2 flex items-center gap-1">
                {t('nav.shop')} <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              {/* Mega Menu Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block w-[720px] bg-luxury-ivory-50 dark:bg-luxury-charcoal-800 border border-luxury-gold-500/10 shadow-2xl p-6 grid grid-cols-3 gap-6 rounded-md">
                <div>
                  <h4 className="font-serif text-xs font-bold text-luxury-gold-500 mb-3 tracking-wider">Ladies Handbags</h4>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/shop?category=luxury-womens-handbags" className="hover:text-luxury-gold-500">Ladies Handbags</Link></li>
                    <li><Link href="/shop?category=shoulder-bags" className="hover:text-luxury-gold-500">Shoulder Bags</Link></li>
                    <li><Link href="/shop?category=tote-bags" className="hover:text-luxury-gold-500">Tote Bags</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-luxury-gold-500 mb-3 tracking-wider">Loafers & Formal Shoes</h4>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/shop?category=loafers" className="hover:text-luxury-gold-500">Loafers</Link></li>
                    <li><Link href="/shop?category=formal-shoes" className="hover:text-luxury-gold-500">Formal Shoes</Link></li>
                    <li><Link href="/shop?category=leather-shoes" className="hover:text-luxury-gold-500">Leather Shoes</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-luxury-gold-500 mb-3 tracking-wider">Travel & Work Bags</h4>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/shop?category=luxury-laptop-bags" className="hover:text-luxury-gold-500">Laptop Bags</Link></li>
                    <li><Link href="/shop?category=duffel-bags" className="hover:text-luxury-gold-500">Duffel Bags</Link></li>
                    <li><Link href="/shop?category=travel-bags" className="hover:text-luxury-gold-500">Travel Bags</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-luxury-gold-500 mb-3 tracking-wider">Belts & Wallets</h4>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/shop?category=belts" className="hover:text-luxury-gold-500">Belts</Link></li>
                    <li><Link href="/shop?category=leather-wallets" className="hover:text-luxury-gold-500">Wallets</Link></li>
                    <li><Link href="/shop?category=card-holders" className="hover:text-luxury-gold-500">Card Holders</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-luxury-gold-500 mb-3 tracking-wider">Leather Jackets</h4>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/shop?category=leather-jackets" className="hover:text-luxury-gold-500">Leather Jackets</Link></li>
                    <li><Link href="/shop?category=accessories" className="hover:text-luxury-gold-500">Accessories</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-luxury-gold-500 mb-3 tracking-wider">Pouches</h4>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/shop?category=pouches" className="hover:text-luxury-gold-500">Pouches</Link></li>
                    <li><Link href="/shop?category=mobile-pouches" className="hover:text-luxury-gold-500">Mobile Pouches</Link></li>
                    <li><Link href="/shop?category=passport-covers" className="hover:text-luxury-gold-500">Passport Sleeves</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <Link href="/about" className="hover:text-luxury-gold-500 transition-colors py-2">{t('nav.about')}</Link>
            <Link href="/craftsmanship" className="hover:text-luxury-gold-500 transition-colors py-2">{t('nav.craftsmanship')}</Link>
            <Link href="/leather-care" className="hover:text-luxury-gold-500 transition-colors py-2">{t('nav.care')}</Link>
            <Link href="/blog" className="hover:text-luxury-gold-500 transition-colors py-2">{t('nav.blog')}</Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-6 text-luxury-charcoal-700 dark:text-luxury-ivory-100">
            {/* Search Toggle */}
            <button onClick={() => setSearchOpen(!searchOpen)} className="hover:text-luxury-gold-500 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Compared items alert */}
            {comparedProducts.length > 0 && (
              <Link href="/shop" onClick={(e) => {
                // Focus on comparison drawer or scroll to it
              }} className="relative hover:text-luxury-gold-500 transition-colors flex items-center gap-1">
                <RefreshCw className="w-5 h-5 animate-spin-slow" />
                <span className="absolute -top-2 -right-2 bg-luxury-gold-500 text-luxury-charcoal-900 rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                  {comparedProducts.length}
                </span>
              </Link>
            )}

            {/* Wishlist Link */}
            <Link href="/wishlist" className="hover:text-luxury-gold-500 transition-colors">
              <Heart className="w-5 h-5" />
            </Link>

            {/* Profile Menu */}
            {user ? (
              <div className="relative group">
                <Link href={user.role === 'ADMIN' ? '/admin' : '/dashboard'} className="hover:text-luxury-gold-500 transition-colors">
                  <User className="w-5 h-5" />
                </Link>
                <div className="absolute right-0 top-full hidden group-hover:block bg-luxury-ivory-50 dark:bg-luxury-charcoal-800 border border-luxury-gold-500/10 shadow-xl p-4 w-48 rounded">
                  <p className="text-xs font-bold text-luxury-gold-500 truncate mb-2">{user.name}</p>
                  <ul className="space-y-2 text-xs normal-case">
                    <li><Link href="/dashboard" className="hover:text-luxury-gold-500 block">My Dashboard</Link></li>
                    {user.role === 'ADMIN' && <li><Link href="/admin" className="hover:text-luxury-gold-500 block font-semibold text-luxury-gold-500">Admin Console</Link></li>}
                    <li><button onClick={logout} className="hover:text-red-500 block w-full text-left">Logout</button></li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hover:text-luxury-gold-500 transition-colors">
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Shopping Cart Trigger */}
            <button 
              onClick={() => setCartOpen(true)}
              className="relative hover:text-luxury-gold-500 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-luxury-gold-500 text-luxury-charcoal-900 rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Sliding Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-luxury-ivory-100 dark:bg-luxury-charcoal-800 border-t border-luxury-gold-500/10 overflow-hidden"
            >
              <div className="max-w-3xl mx-auto py-4 px-6 flex gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('common.searchPlaceholder')}
                  className="flex-1 bg-transparent border-b border-luxury-gold-500 focus:outline-none text-luxury-charcoal-900 dark:text-luxury-ivory-100 placeholder-luxury-charcoal-400 font-serif"
                />
                <Link
                  href={`/shop?search=${searchQuery}`}
                  onClick={() => setSearchOpen(false)}
                  className="bg-luxury-gold-500 hover:bg-luxury-gold-600 text-luxury-charcoal-900 px-6 py-2 uppercase text-xs tracking-wider font-bold transition-colors"
                >
                  {t('common.search')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[450px] bg-luxury-ivory-50 dark:bg-luxury-charcoal-900 shadow-2xl z-50 p-6 flex flex-col"
            >
              <div className="flex justify-between items-center border-b border-luxury-gold-500/10 pb-4 mb-4">
                <h3 className="font-serif text-lg tracking-wider text-luxury-charcoal-900 dark:text-luxury-ivory-100 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-luxury-gold-500" />
                  {t('cart.title')} ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                </h3>
                <button onClick={() => setCartOpen(false)}>
                  <X className="w-5 h-5 text-luxury-charcoal-500 hover:text-luxury-gold-500" />
                </button>
              </div>

              {/* Cart List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-center text-luxury-charcoal-400">
                    <ShoppingBag className="w-16 h-16 mb-4 text-luxury-gold-200" />
                    <p className="font-serif italic">{t('cart.empty')}</p>
                    <Link 
                      href="/shop" 
                      onClick={() => setCartOpen(false)}
                      className="mt-6 text-xs uppercase tracking-wider font-bold text-luxury-gold-500 hover:underline"
                    >
                      {t('common.shopCollection')}
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.productId} className="flex gap-4 bg-white/40 dark:bg-black/20 p-3 border border-luxury-gold-500/5 rounded">
                      <div className="w-20 h-20 bg-luxury-charcoal-100 relative overflow-hidden rounded">
                        {/* Fallback image style or placeholder */}
                        <div className="absolute inset-0 bg-cover bg-center bg-zinc-400 dark:bg-zinc-800 flex items-center justify-center text-luxury-charcoal-900 font-bold text-[8px] p-2 text-center">
                          {item.name}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-sm font-medium leading-tight dark:text-luxury-ivory-100">{item.name}</h4>
                          <span className="text-xs text-luxury-gold-500 font-bold block mt-1">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          {/* Quantity Controls */}
                          <div className="flex border border-luxury-gold-500/20 text-xs">
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-luxury-gold-500/10"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-luxury-gold-500/10"
                            >
                              +
                            </button>
                          </div>
                          {/* Trash */}
                          <button 
                            onClick={() => removeFromCart(item.productId)}
                            className="text-red-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer Calculations */}
              {cart.length > 0 && (
                <div className="border-t border-luxury-gold-500/10 pt-4 mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-luxury-charcoal-500">{t('cart.subtotal')}</span>
                    <span className="font-medium text-luxury-charcoal-800 dark:text-luxury-ivory-100">
                      {formatPrice(getCartTotal())}
                    </span>
                  </div>
                  {getDiscountAmount() > 0 && (
                    <div className="flex justify-between text-sm text-green-500">
                      <span>{t('common.discount')}</span>
                      <span>-{formatPrice(getDiscountAmount())}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold border-t border-luxury-gold-500/10 pt-3">
                    <span>{t('common.total')}</span>
                    <span className="text-luxury-gold-500">{formatPrice(getFinalTotal())}</span>
                  </div>

                  <Link 
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="w-full bg-luxury-gold-500 hover:bg-luxury-gold-600 text-luxury-charcoal-900 font-bold py-3 block text-center uppercase text-xs tracking-wider transition-colors duration-300 rounded"
                  >
                    {t('cart.checkout')}
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-luxury-ivory-50 dark:bg-luxury-charcoal-900 shadow-2xl z-50 p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif tracking-widest text-lg text-luxury-gold-500">GOATHIDES</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-5 h-5 text-luxury-charcoal-800 dark:text-luxury-ivory-100" />
                </button>
              </div>
              <nav className="flex flex-col gap-4 text-sm font-semibold tracking-wider uppercase text-luxury-charcoal-800 dark:text-luxury-ivory-100">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>{t('nav.home')}</Link>
                <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>{t('nav.shop')}</Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</Link>
                <Link href="/craftsmanship" onClick={() => setMobileMenuOpen(false)}>{t('nav.craftsmanship')}</Link>
                <Link href="/leather-care" onClick={() => setMobileMenuOpen(false)}>{t('nav.care')}</Link>
                <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>{t('nav.blog')}</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default Header;
