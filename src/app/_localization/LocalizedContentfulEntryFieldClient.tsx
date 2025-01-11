'use client';

import { type FC } from 'react';

import { defaultLocale } from '../../../translation/defaultLocale';

import { useDynamicTranslationStore } from 'lib/stores/dynamicTranslationStore';
import { usePathnameLocale } from 'lib/translation/usePathnameLocale';

export const useLocalizedContentfulEntryFieldClient = (
  translatedEntryField: Record<string, string>,
) => {
  const currentLocale = usePathnameLocale();

  const { showLocalizedContent } = useDynamicTranslationStore();

  const requestLocale =
    (showLocalizedContent && currentLocale) || defaultLocale;

  return translatedEntryField[requestLocale];
};

const LocalizedContentfulEntryFieldClient: FC<{
  // locale -> translated content
  translatedEntryField: Record<string, string>;
}> = ({ translatedEntryField }) => {
  const value = useLocalizedContentfulEntryFieldClient(translatedEntryField);

  return <div dangerouslySetInnerHTML={{ __html: value }} />;
};

export default LocalizedContentfulEntryFieldClient;
