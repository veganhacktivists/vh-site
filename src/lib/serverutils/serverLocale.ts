import { locales } from '../../../i18nConfig';

import { serverPathname } from './serverPathname';

interface Options {
  errorIfUnavailable?: boolean; // default: true
}

/**
 * Extracts the first path segment and verifys it is a configured locale.
 * Returns the locale if true. Otherwise returns undefined.
 */
export async function serverLocale(
  { errorIfUnavailable }: Options = { errorIfUnavailable: true },
): Promise<string | undefined> {
  const pathname = await serverPathname({ errorIfUnavailable });

  const firstPathnameSegment = pathname?.match(/^\/([^\/]+)\/?/)?.[1];

  if (firstPathnameSegment && locales.includes(firstPathnameSegment)) {
    return firstPathnameSegment;
  }

  return undefined;
}
