import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { locales } from '../../../i18nConfig';

export const usePathnameWithoutLocale = (): string | null => {
  const pathname = usePathname();

  return useMemo(() => {
    if (pathname === null) {
      return null;
    }

    const pathSegments = pathname.split('/').filter(Boolean);

    if (!locales.includes(pathSegments[0])) {
      return pathname;
    }

    const pathnameWithoutLocale = '/' + pathSegments.slice(1).join('/');

    return pathnameWithoutLocale;
  }, [pathname]);
};
