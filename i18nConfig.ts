import { defaultLocale } from './translation/defaultLocale';

import type { Config } from 'next-i18n-router/dist/types';

export const locales = ['en' /**, 'de', 'zh', 'dev' */];

if (!locales.includes(defaultLocale)) {
  throw new Error('defaultLocale must be one of ' + locales.join(', '));
}

const i18nConfig: Config = {
  locales,
  defaultLocale,
  prefixDefault: true,
  serverSetCookie: 'always',
  ...(process.env.NODE_ENV === 'development' ? { localeDetector: false } : {}),
};

export default i18nConfig;
