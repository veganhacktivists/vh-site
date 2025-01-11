'use client';

import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useMemo } from 'react';

import { locales } from '../../../i18nConfig';
import { defaultLocale } from '../../../translation/defaultLocale';

import { usePathnameLocale } from 'lib/translation/usePathnameLocale';
import { usePathnameWithoutLocale } from 'lib/translation/usePathnameWithoutLocale';

/**
 * Locale selector positioned in the page header.
 * When focused, options are shown to the user to switch to a different locale.
 */
export const LocaleSelector = () => {
  const pathnameWithoutLocale = usePathnameWithoutLocale();

  const languageDisplayNames = useMemo(
    () =>
      locales &&
      Object.fromEntries(
        locales.map((locale) => [
          locale,
          new Intl.DisplayNames(locale, { type: 'language' }).of(locale) ??
            locale,
        ]),
      ),
    [],
  );

  const currentLocale = usePathnameLocale() ?? defaultLocale;

  const localeOptions = useMemo(
    () => locales && locales.filter((locale) => locale !== currentLocale),
    [currentLocale],
  );

  if (
    !localeOptions ||
    localeOptions.length === 0 ||
    !languageDisplayNames ||
    !pathnameWithoutLocale
  ) {
    return null;
  }

  return (
    <div>
      <div
        className='relative group text-xl h-full w-full flex flex-col items-center justify-center py-6'
        tabIndex={0}
      >
        <div className='flex flex-col items-center justify-center cursor-pointer group-focus-within:cursor-default'>
          <div className='px-4 w-full h-full transition duration-300 ease-in-out opacity-0 group-focus-within:opacity-100 text-center'>
            {languageDisplayNames[currentLocale]}
          </div>
          <div className='absolute top-0 px-4 w-full h-full flex items-center justify-center transition duration-300 ease-in-out opacity-100 group-focus-within:opacity-0'>
            <FontAwesomeIcon icon={faLanguage} fixedWidth />
          </div>
          <div className='z-30 absolute top-full transition duration-300 ease-in-out opacity-0 group-focus-within:opacity-100 bg-black'>
            <div className='overflow-y-hidden h-0 group-focus-within:overflow-visible group-focus-within:h-auto flex flex-col center bg-black'>
              {localeOptions.map((locale) => {
                const href = `/${locale}${pathnameWithoutLocale}`;
                return (
                  <Link key={href} href={href} className='p-4'>
                    {languageDisplayNames[locale]}
                  </Link>
                );
              })}
            </div>
          </div>
          {/* clone of above locale selection dropdown, invisible with height 0, to respect the width of the widest element */}
          <div className='h-0 overflow-y-hidden flex flex-col center'>
            {localeOptions.map((locale) => {
              const href = `/${locale}${pathnameWithoutLocale}`;
              return (
                <Link key={href} href={href} className='px-4'>
                  {languageDisplayNames[locale]}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
