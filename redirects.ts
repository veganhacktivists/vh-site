// Used by middleware

import { locales } from './i18nConfig';

interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
}

function redirectsForLocale(locale?: string): Redirect[] {
  const localeSegment = !locale ? '' : `/${locale}`;
  return [
    {
      source: `${localeSegment}/about`,
      destination: `${localeSegment}/about/our-mission`,
      permanent: true,
    },
    {
      source: `${localeSegment}/challenge`,
      destination:
        'https://gist.github.com/GRardB/7e2990bbea8c2e50e2b501b712d8c169',
      permanent: false,
    },
    {
      source: `${localeSegment}/people`,
      destination: `${localeSegment}/people/team`,
      permanent: true,
    },
    {
      source: `${localeSegment}/team`,
      destination: `${localeSegment}/people/team`,
      permanent: true,
    },
    {
      source: `${localeSegment}/year-in-review`,
      destination: `${localeSegment}/year-in-review/2023`,
      permanent: false,
    },
    {
      source: `${localeSegment}/apply`,
      destination: `${localeSegment}/join`,
      permanent: true,
    },
    {
      source: `${localeSegment}/projects`,
      destination: `${localeSegment}/work`,
      permanent: true,
    },
    {
      // this redirect is also configured in the next
      //  config to ensure the file included in the build
      source: `${localeSegment}/research`,
      destination: '/tech-and-data-in-the-movement.pdf',
      permanent: false,
    },
    {
      source: `${localeSegment}/joinplayground`,
      destination: 'https://discord.gg/vhplayground',
      permanent: false,
    },
  ];
}

type RedirectMap = Record<string, { destination: string; permanent: boolean }>;

export function createRedirectMap(): RedirectMap {
  // create redirect for each locale
  return [undefined, ...locales]
    .flatMap((locale) => redirectsForLocale(locale))
    .reduce<RedirectMap>((acc, redirect) => {
      acc[redirect.source] = {
        destination: new URL(redirect.destination, process.env.URL).toString(),
        permanent: redirect.permanent,
      };
      return acc;
    }, {});
}
