'use client';

import { IntlProvider } from 'react-intl';

import type { PropsWithChildren } from 'react';

export const TranslationProvider = ({
  children,
  locale,
  messages,
}: PropsWithChildren<{ locale: string; messages: Record<string, string> }>) => {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};
