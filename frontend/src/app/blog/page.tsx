'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import Link from 'next/link';

export default function Blog() {
  const POSTS = [
    {
      title: "The Art of Slow Fashion: Choosing Permanence",
      date: "July 12, 2026",
      excerpt: "In a world dominated by rapid retail loops, we explore why purchasing high-end heirloom accessories is both economically and ecologically sound.",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400",
      readTime: "5 min read"
    },
    {
      title: "Why Goat Hide is Lighter & Stronger Than Cowhide",
      date: "June 28, 2026",
      excerpt: "Diving into the biology of leather collagens. Discover how the unique interlocking network of goat hide provides superior durability with half the weight.",
      img: "/ledor.jpg",
      readTime: "4 min read"
    },
    {
      title: "Vegetable vs. Chrome Tanning: The Chemistry",
      date: "May 15, 2026",
      excerpt: "Chrome tanning takes 1 day, vegetable tanning takes 40. We break down the structural differences and why organic bark processing is superior.",
      img: "/tanned.jpg",
      readTime: "8 min read"
    }
  ];

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16 flex-1 space-y-12">
        <div className="border-b border-luxury-gold-500/10 pb-6">
          <h1 className="text-3xl sm:text-5xl font-serif tracking-wider">The Legacy Journal</h1>
          <p className="text-xs text-luxury-charcoal-400 mt-2">Insights on slow fashion, leather biology, and care guides.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post, idx) => (
            <article 
              key={idx}
              className="group bg-white dark:bg-luxury-charcoal-800 border border-luxury-gold-500/5 rounded overflow-hidden flex flex-col justify-between hover:shadow-luxury transition-all duration-300"
            >
              <div>
                <div className="h-48 bg-luxury-charcoal-100 overflow-hidden relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-103 transition-transform duration-500" 
                    style={{ backgroundImage: `url(${post.img})` }}
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-luxury-charcoal-400 uppercase font-bold">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold group-hover:text-luxury-gold-500 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-xs text-luxury-charcoal-500 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link 
                  href="#"
                  className="text-xs uppercase tracking-wider font-bold text-luxury-gold-500 hover:underline"
                >
                  Read Article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
      <LiveChat />
    </>
  );
}
