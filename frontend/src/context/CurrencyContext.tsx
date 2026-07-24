'use client';

import React, { createContext, useContext, useState } from 'react';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY' | 'AED';

interface CurrencyContextProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amountInUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.78,
  INR: 83.5,
  JPY: 155.0,
  AED: 3.67,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
  AED: 'د.إ',
};

const CURRENCY_LOCALE: Record<Currency, string> = {
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
  INR: 'en-IN',
  JPY: 'ja-JP',
  AED: 'ar-AE',
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('USD');

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('gh_currency', newCurrency);
  };

  const formatPrice = (amountInUSD: number): string => {
    const rate = EXCHANGE_RATES[currency];
    const converted = amountInUSD * rate;
    
    return new Intl.NumberFormat(CURRENCY_LOCALE[currency], {
      style: 'currency',
      currency: currency,
    }).format(converted);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
