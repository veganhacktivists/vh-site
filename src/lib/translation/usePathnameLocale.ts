import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { locales } from '../../../i18nConfig';

// using useParams to read the locale is not available in the root route
export const usePathnameLocale = (): string | null => {
  const pathname = usePathname();

  return useMemo(() => {
    if (pathname === null) {
      return null;
    }

    const firstPathnameSegment = pathname.match(/^\/([^\/]+)\/?/)?.[1];

    if (firstPathnameSegment && locales.includes(firstPathnameSegment)) {
      return firstPathnameSegment;
    }

    return null;
  }, [pathname]);
};
