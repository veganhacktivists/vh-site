/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import TagManager from 'react-gtm-module';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { useIntl } from 'react-intl';

import useOnce from '../hooks/useOnce';
import { defaultLocale } from '../../translation/defaultLocale';

import Header from 'components/layout/header/index_pages';
import Footer from 'components/layout/footer';
import PageWrapper, { MainWrapper } from 'components/layout/wrapper';
import { TranslationProvider } from 'lib/translation/TranslationProvider';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { usePathnameLocale } from 'lib/translation/usePathnameLocale';
import { messages } from 'lib/translation/messages';
import { TRPCReactProvider } from 'trpc/react';

import type { NextPage } from 'next';
import type { DefaultSeoProps } from 'next-seo';
import type ReactAxe from '@axe-core/react';
import type { ReactDOM } from 'react';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import type { IntlShape } from 'react-intl';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  const ReactDOM = require('react-dom') as ReactDOM;
  const axe = require('@axe-core/react') as typeof ReactAxe;
  axe(React, ReactDOM, 1000).catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Error loading @axe-core/react', error);
  });
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC<React.PropsWithChildren>;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const getSeo = (intl: IntlShape): DefaultSeoProps => ({
  titleTemplate: intl.formatMessage({
    id: 'app.template.next-seo.default.title-template',
    defaultMessage: '<no-localization>%s | Vegan Hacktivists</no-localization>',
  }),
  openGraph: {
    url: 'https://veganhacktivists.org',
    images: [
      {
        url: 'https://veganhacktivists.org/images/VH_Logo_1024px.png',
        alt: 'veganhacktivists.org Logo 1024',
        height: 1024,
        width: 1024,
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
});

const AppDefaultSeo = () => <DefaultSeo {...getSeo(useIntl())} />;

const AppWrapper: React.FC<
  React.PropsWithChildren<{ session: Session | null }>
> = ({ children, session }) => {
  const locale = usePathnameLocale() ?? defaultLocale;

  return (
    <TRPCReactProvider>
      <SessionProvider session={session}>
        <CookiesProvider>
          <TranslationProvider locale={locale} messages={messages[locale]}>
            <AppDefaultSeo />
            {children}
          </TranslationProvider>
        </CookiesProvider>
      </SessionProvider>
    </TRPCReactProvider>
  );
};

// override the per-page layout here
const DefaultLayout: React.FC<
  React.PropsWithChildren<{
    pathname: string;
  }>
> = ({ children }) => {
  return (
    <>
      <Header />
      <MainWrapper>{children}</MainWrapper>
      <Footer />
    </>
  );
};

const MyApp: React.FC<AppPropsWithLayout> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  useOnce(() => {
    if (process.env.NODE_ENV === 'production') {
      TagManager.initialize({
        gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CONTAINER_ID || '',
      });
    }
  });

  const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
    <DefaultLayout pathname={router.pathname}>
      {Component.Layout ? (
        <Component.Layout>{children}</Component.Layout>
      ) : (
        <>{children}</>
      )}
    </DefaultLayout>
  );

  return (
    <AppWrapper session={session as Session | null}>
      <PageWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PageWrapper>
    </AppWrapper>
  );
};

export default MyApp;
