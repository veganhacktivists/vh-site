'use client';

import { CookiesProvider } from 'react-cookie';
import { IntlProvider } from 'react-intl';
import { type PropsWithChildren } from 'react';
import React from 'react';
import TagManager from 'react-gtm-module';

import { TRPCReactProvider } from 'trpc/react';
import useOnce from 'hooks/useOnce';

import type { ReactDOM } from 'react';
import type ReactAxe from '@axe-core/react';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const ReactDOM = require('react-dom') as ReactDOM;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axe = require('@axe-core/react') as typeof ReactAxe;
  axe(React, ReactDOM, 1000).catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Error loading @axe-core/react', error);
  });
}

interface Props {
  intlProps: {
    locale: string;
    messages: Record<string, string>;
  };
}

const ClientLayout = ({
  children,
  intlProps: { locale, messages },
}: PropsWithChildren<Props>) => {
  useOnce(() => {
    if (process.env.NODE_ENV === 'production') {
      TagManager.initialize({
        gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CONTAINER_ID || '',
      });
    }
  });

  return (
    <TRPCReactProvider>
      <CookiesProvider>
        <IntlProvider locale={locale} messages={messages}>
          {children}
        </IntlProvider>
      </CookiesProvider>
    </TRPCReactProvider>
  );
};

export default ClientLayout;
