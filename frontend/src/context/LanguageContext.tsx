'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, translations } from '../locales/translations';

interface LanguageContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

function applyDocumentLocale(newLocale: Locale) {
  if (newLocale === 'ar') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = newLocale;
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('gh_locale', newLocale);
    applyDocumentLocale(newLocale);
  };

  // Translation resolver (dots notation: "nav.home")
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[locale];
    
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        // Fallback to English
        let fallbackResult: any = translations['en'];
        for (const fk of keys) {
          if (fallbackResult && fallbackResult[fk] !== undefined) {
            fallbackResult = fallbackResult[fk];
          } else {
            return key; // return the path itself as fallback
          }
        }
        return fallbackResult;
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within LanguageProvider');
  return context;
};
