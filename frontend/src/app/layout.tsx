import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartWishlistProvider } from '@/context/CartWishlistContext';
import { CountryProvider } from '@/context/CountryContext';

export const metadata: Metadata = {
  title: 'GOATHIDES | Luxury Leather Goods',
  description: 'Crafted for Life. Designed for Legacy. Handcrafted vegetable-tanned premium goat leather handbags, wallets, and bags.',
  keywords: 'luxury leather, goat hides, leather bags, luxury handbags, premium wallets, travel bags, craftsmanship',
  authors: [{ name: 'GOATHIDES Design House' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-luxury-ivory-50 dark:bg-luxury-charcoal-900 text-luxury-charcoal-800 dark:text-luxury-charcoal-100 min-h-screen flex flex-col">
        <LanguageProvider>
          <CurrencyProvider>
            <CountryProvider>
              <AuthProvider>
                <CartWishlistProvider>
                  {children}
                </CartWishlistProvider>
              </AuthProvider>
            </CountryProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
