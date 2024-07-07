'use client';

import { type FC, useEffect } from 'react';

import { defaultLocale } from '../../../i18nConfig';

import { api } from 'trpc/react';
import { useDynamicTranslationStore } from 'lib/stores/dynamicTranslationStore';
import { useRouterLocale } from 'lib/translation/useRouterLocale';

export const useLocalizedContentfulEntryField = ({
  contentfulId,
  fieldId,
  contentType,
}: {
  contentfulId: string;
  fieldId: string;
  contentType: string;
}): string => {
  const currentLocale = useRouterLocale();

  const { showLocalizedContent, registerChildLoadState } =
    useDynamicTranslationStore();

  const requestLocale = showLocalizedContent ? currentLocale : defaultLocale;

  const localizedHTML = api.translation.getLocalizedHTML.useQuery(
    {
      contentfulId,
      fieldId,
      contentType,
      locale: requestLocale,
    },
    {
      staleTime: Infinity,
      enabled: true,
    },
  );

  useEffect(() => {
    registerChildLoadState(
      contentfulId + fieldId + contentType,
      localizedHTML.isFetching,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localizedHTML.isFetching]);

  return localizedHTML.data ?? '';
};

const LocalizedContentfulEntryField: FC<{
  contentfulId: string;
  fieldId: string;
  contentType: string;
}> = ({ contentfulId, fieldId, contentType }) => {
  const localizedContentfulEntryField = useLocalizedContentfulEntryField({
    contentfulId,
    fieldId,
    contentType,
  });

  return (
    <div dangerouslySetInnerHTML={{ __html: localizedContentfulEntryField }} />
  );
};

export default LocalizedContentfulEntryField;
