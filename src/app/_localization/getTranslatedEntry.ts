import 'server-only';

import { defaultLocale } from '../../../translation/defaultLocale';

import { api } from 'trpc/server';

export async function getTranslatedEntryField(
  {
    contentfulId,
    fieldId,
    contentType,
  }: {
    contentfulId: string;
    fieldId: string;
    contentType: string;
  },
  locale: string,
): Promise<Record<string, string>> {
  const locales = Array.from(new Set([locale, defaultLocale]));

  const translatedEntryField: Record<string, string | undefined> =
    Object.fromEntries(
      await Promise.all(
        locales.map(
          async (locale): Promise<[string, string | undefined]> => [
            locale,
            await api.translation.getLocalizedHTML({
              contentfulId,
              fieldId,
              contentType,
              locale,
            }),
          ],
        ),
      ),
    );

  if (translatedEntryField[locale] === undefined) {
    console.log(
      'using defaultLocale as fallback as translation is not available',
      fieldId,
      contentType,
    );
    translatedEntryField[locale] = translatedEntryField[defaultLocale];
  }

  return translatedEntryField as Record<string, string>;
}
