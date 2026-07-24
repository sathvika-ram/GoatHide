'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Locale } from '@/locales/translations';
import { Currency } from '@/context/CurrencyContext';
import { COUNTRY_SETTINGS, CountryCode, DEFAULT_COUNTRY, isCountryCode } from '@/config/countrySettings';

const STORAGE_KEY = 'gh_country';

interface CountryContextProps {
  country: CountryCode;
  setCountry: (country: CountryCode) => void;
  setLocaleForCountry: (locale: Locale) => void;
  setCurrencyForCountry: (currency: Currency) => void;
}

const CountryContext = createContext<CountryContextProps | undefined>(undefined);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setLocale } = useTranslation();
  const { setCurrency } = useCurrency();
  const [country, setCountryState] = useState<CountryCode>(DEFAULT_COUNTRY);

  const applyCountry = useCallback(
    (code: CountryCode, persist = true) => {
      const settings = COUNTRY_SETTINGS[code];
      setCountryState(code);
      if (persist) {
        localStorage.setItem(STORAGE_KEY, code);
      }
      setLocale(settings.locale);
      setCurrency(settings.currency);
    },
    [setCurrency, setLocale]
  );

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && isCountryCode(saved)) {
      applyCountry(saved, false);
    } else {
      applyCountry(DEFAULT_COUNTRY, false);
    }
  }, [applyCountry]);

  const setCountry = (code: CountryCode) => {
    applyCountry(code);
  };

  const setLocaleForCountry = (locale: Locale) => {
    const matched = (Object.entries(COUNTRY_SETTINGS) as [CountryCode, (typeof COUNTRY_SETTINGS)[CountryCode]][]).find(
      ([, settings]) => settings.locale === locale
    );
    if (matched) {
      applyCountry(matched[0]);
    } else {
      setLocale(locale);
    }
  };

  const setCurrencyForCountry = (currency: Currency) => {
    const currentLocale = COUNTRY_SETTINGS[country].locale;
    const withLocale = (
      Object.entries(COUNTRY_SETTINGS) as [CountryCode, (typeof COUNTRY_SETTINGS)[CountryCode]][]
    ).find(([, settings]) => settings.currency === currency && settings.locale === currentLocale);
    if (withLocale) {
      applyCountry(withLocale[0]);
      return;
    }

    const byCurrency = (
      Object.entries(COUNTRY_SETTINGS) as [CountryCode, (typeof COUNTRY_SETTINGS)[CountryCode]][]
    ).find(([, settings]) => settings.currency === currency);
    if (byCurrency) {
      applyCountry(byCurrency[0]);
    } else {
      setCurrency(currency);
    }
  };

  return (
    <CountryContext.Provider value={{ country, setCountry, setLocaleForCountry, setCurrencyForCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) throw new Error('useCountry must be used within CountryProvider');
  return context;
};
