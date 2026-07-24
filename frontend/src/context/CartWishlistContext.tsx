'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  price: number;
  slug: string;
  image: string;
  description: string;
  sku: string;
  rating: number;
  details: Record<string, string>;
}

interface CartWishlistContextProps {
  cart: CartItem[];
  wishlist: string[]; // array of product IDs
  comparedProducts: ProductDetail[]; // limit to 3
  recentlyViewed: string[]; // array of product slugs
  coupon: { code: string; discountType: 'PERCENTAGE' | 'FIXED'; discountValue: number } | null;
  giftCard: { code: string; balance: number } | null;
  pointsToRedeem: number;
  
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  addToCompare: (product: ProductDetail) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  
  addRecentlyViewed: (slug: string) => void;
  
  applyCoupon: (code: string) => Promise<boolean>;
  applyGiftCard: (code: string) => Promise<boolean>;
  setPointsToRedeem: (points: number) => void;
  
  getCartTotal: () => number;
  getDiscountAmount: () => number;
  getFinalTotal: () => number;
}

const CartWishlistContext = createContext<CartWishlistContextProps | undefined>(undefined);
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const CartWishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [comparedProducts, setComparedProducts] = useState<ProductDetail[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [coupon, setCoupon] = useState<CartWishlistContextProps['coupon']>(null);
  const [giftCard, setGiftCard] = useState<CartWishlistContextProps['giftCard']>(null);
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(0);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('gh_cart');
    const savedWishlist = localStorage.getItem('gh_wishlist');
    const savedRecently = localStorage.getItem('gh_recently');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedRecently) setRecentlyViewed(JSON.parse(savedRecently));
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('gh_cart', JSON.stringify(newCart));
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    const existing = cart.find((i) => i.productId === item.productId);
    if (existing) {
      const updated = cart.map((i) =>
        i.productId === item.productId ? { ...i, quantity: i.quantity + quantity } : i
      );
      saveCart(updated);
    } else {
      saveCart([...cart, { ...item, quantity }]);
    }
  };

  const removeFromCart = (productId: string) => {
    const updated = cart.filter((i) => i.productId !== productId);
    saveCart(updated);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updated = cart.map((i) => (i.productId === productId ? { ...i, quantity } : i));
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
    setCoupon(null);
    setGiftCard(null);
    setPointsToRedeem(0);
  };

  const toggleWishlist = (productId: string) => {
    let updated;
    if (wishlist.includes(productId)) {
      updated = wishlist.filter((id) => id !== productId);
    } else {
      updated = [...wishlist, productId];
    }
    setWishlist(updated);
    localStorage.setItem('gh_wishlist', JSON.stringify(updated));
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addToCompare = (product: ProductDetail) => {
    if (comparedProducts.find((p) => p.id === product.id)) return;
    if (comparedProducts.length >= 3) {
      alert('You can compare up to 3 products at a time.');
      return;
    }
    setComparedProducts([...comparedProducts, product]);
  };

  const removeFromCompare = (productId: string) => {
    setComparedProducts(comparedProducts.filter((p) => p.id !== productId));
  };

  const clearCompare = () => setComparedProducts([]);

  const addRecentlyViewed = (slug: string) => {
    const filtered = recentlyViewed.filter((s) => s !== slug);
    const updated = [slug, ...filtered].slice(0, 5); // limit to 5
    setRecentlyViewed(updated);
    localStorage.setItem('gh_recently', JSON.stringify(updated));
  };

  const applyCoupon = async (code: string): Promise<boolean> => {
    try {
      // Direct mock response since coupon code verification depends on db
      if (code.toUpperCase() === 'WELCOME10') {
        setCoupon({ code: 'WELCOME10', discountType: 'PERCENTAGE', discountValue: 10 });
        return true;
      }
      if (code.toUpperCase() === 'LEGACY150') {
        setCoupon({ code: 'LEGACY150', discountType: 'FIXED', discountValue: 150 });
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const applyGiftCard = async (code: string): Promise<boolean> => {
    if (code.toUpperCase() === 'GH-GIFT-VAL-500') {
      setGiftCard({ code: 'GH-GIFT-VAL-500', balance: 500 });
      return true;
    }
    return false;
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getDiscountAmount = () => {
    const subtotal = getCartTotal();
    let discount = 0;

    if (coupon) {
      if (coupon.discountType === 'PERCENTAGE') {
        discount = (subtotal * coupon.discountValue) / 100;
      } else {
        discount = coupon.discountValue;
      }
    }

    if (pointsToRedeem > 0) {
      discount += pointsToRedeem * 0.1; // $0.10 discount per point
    }

    if (giftCard) {
      const remainingCost = Math.max(0, subtotal - discount);
      discount += Math.min(giftCard.balance, remainingCost);
    }

    return Math.min(subtotal, discount);
  };

  const getFinalTotal = () => {
    const subtotal = getCartTotal();
    const discount = getDiscountAmount();
    return Math.max(0, subtotal - discount);
  };

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,
        comparedProducts,
        recentlyViewed,
        coupon,
        giftCard,
        pointsToRedeem,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addToCompare,
        removeFromCompare,
        clearCompare,
        addRecentlyViewed,
        applyCoupon,
        applyGiftCard,
        setPointsToRedeem,
        getCartTotal,
        getDiscountAmount,
        getFinalTotal,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (!context) throw new Error('useCartWishlist must be used within CartWishlistProvider');
  return context;
};
