import { Locale } from '@/locales/translations';
import { Currency } from '@/context/CurrencyContext';

export type CountryCode =
  | 'US'
  | 'GB'
  | 'FR'
  | 'DE'
  | 'ES'
  | 'IT'
  | 'IN'
  | 'AE'
  | 'JP'
  | 'CN';

export interface CountrySetting {
  locale: Locale;
  currency: Currency;
  label: string;
}

export const DEFAULT_COUNTRY: CountryCode = 'IN';

export const COUNTRY_SETTINGS: Record<CountryCode, CountrySetting> = {
  US: { locale: 'en', currency: 'USD', label: 'United States' },
  GB: { locale: 'en', currency: 'GBP', label: 'United Kingdom' },
  FR: { locale: 'fr', currency: 'EUR', label: 'France' },
  DE: { locale: 'de', currency: 'EUR', label: 'Germany' },
  ES: { locale: 'es', currency: 'EUR', label: 'Spain' },
  IT: { locale: 'it', currency: 'EUR', label: 'Italy' },
  IN: { locale: 'en', currency: 'INR', label: 'India' },
  AE: { locale: 'ar', currency: 'AED', label: 'UAE' },
  JP: { locale: 'ja', currency: 'JPY', label: 'Japan' },
  CN: { locale: 'zh', currency: 'USD', label: 'China' },
};

export function isCountryCode(value: string): value is CountryCode {
  return value in COUNTRY_SETTINGS;
}

/** Prefer an exact locale + currency match, then locale-only. */
export function findCountryCode(locale: Locale, currency: Currency): CountryCode | null {
  const exact = (Object.entries(COUNTRY_SETTINGS) as [CountryCode, CountrySetting][]).find(
    ([, settings]) => settings.locale === locale && settings.currency === currency
  );
  if (exact) return exact[0];

  const byLocale = (Object.entries(COUNTRY_SETTINGS) as [CountryCode, CountrySetting][]).find(
    ([, settings]) => settings.locale === locale
  );
  return byLocale?.[0] ?? null;
}
