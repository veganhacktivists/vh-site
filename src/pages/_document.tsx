import { Html, Head, Main, NextScript } from 'next/document';

import { defaultLocale } from '../../translation/defaultLocale';

import { usePathnameLocale } from 'lib/translation/usePathnameLocale';

const Document = () => {
  const locale = usePathnameLocale() ?? defaultLocale;

  return (
    <Html lang={locale}>
      <Head>
        {process.env.NODE_ENV === 'production' &&
          process.env.ANALYTICS_WEBSITE_ID && (
            <script
              defer
              src='https://analytics.veganhacktivists.org/script.js'
              data-website-id={process.env.ANALYTICS_WEBSITE_ID}
            />
          )}
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#161919' />
        <meta name='msapplication-TileColor' content='#161919' />
        <meta name='theme-color' content='#161919' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
