import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { unstable_cache } from 'next/cache';

import { defaultLocale } from '../../../../translation/defaultLocale';

import { getHTMLStringFromFieldValue, getLocalizedHTMLHash } from './helper';

import { getById } from 'lib/cms';
import prisma from 'lib/db/prisma';

import type { getLocalizedHTMLSchema } from './schemas';

const getCachedById = unstable_cache(getById);
const cachedTranslateHTML = unstable_cache(translateHTML);

const getCachedLocalizedHTML = async ({
  contentfulId,
  fieldId,
  locale,
}: z.infer<typeof getLocalizedHTMLSchema>) => {
  const cachedTranslation = await prisma.contentfulTranslationCache.findUnique({
    where: {
      id: {
        contentfulId,
        fieldId,
        locale,
      },
    },
  });

  if (cachedTranslation) {
    return cachedTranslation.translatedHTML;
  }
};

/**
 * Return cached value if available.
 * Else load Contentful entry,
 * extract original html,
 * store original html in cache,
 * translate original html,
 * store translated html in cache
 */
export const getLocalizedHTML = unstable_cache(
  async ({
    contentfulId,
    fieldId,
    locale,
    contentType,
  }: z.infer<typeof getLocalizedHTMLSchema>) => {
    try {
      const cachedTranslation = await getCachedLocalizedHTML({
        contentfulId,
        fieldId,
        locale,
        contentType,
      });

      if (cachedTranslation) {
        return cachedTranslation;
      }

      const existingOriginalTranslationCache =
        await prisma.contentfulTranslationCache.findUnique({
          where: {
            id: {
              contentfulId,
              fieldId,
              locale: defaultLocale,
            },
          },
        });

      let originalHTML: string;
      let originalHTMLHash: string;

      if (!existingOriginalTranslationCache) {
        const entry =
          await getCachedById<Record<string, unknown>>(contentfulId);

        const originalValue = entry.fields[fieldId];
        const extractedOriginalHTML =
          getHTMLStringFromFieldValue(originalValue);

        if (extractedOriginalHTML === undefined) {
          // eslint-disable-next-line no-console
          console.error(
            `failed to get html string for contentfulId ${contentfulId}, fieldId ${fieldId}, contentType ${contentType} and locale ${locale}`,
          );
          throw new TRPCError({ code: 'NOT_FOUND' });
        }

        const generatedOriginalHTMLHash = getLocalizedHTMLHash(
          extractedOriginalHTML,
        );

        try {
          await prisma.contentfulTranslationCache.upsert({
            where: {
              id: {
                contentfulId,
                fieldId,
                locale: defaultLocale,
              },
            },
            create: {
              contentfulId,
              contentType,
              fieldId,
              locale: defaultLocale,
              translatedHTML: extractedOriginalHTML,
              originalHTMLHash: generatedOriginalHTMLHash,
            },
            update: {
              translatedHTML: extractedOriginalHTML,
              originalHTMLHash: generatedOriginalHTMLHash,
            },
          });
        } catch (error) {
          console.log(
            'error saving untranslated entry',
            error,
            fieldId,
            contentType,
            locale,
            contentfulId,
          );
        }

        if (locale === defaultLocale) {
          return extractedOriginalHTML;
        }

        originalHTML = extractedOriginalHTML;
        originalHTMLHash = generatedOriginalHTMLHash;
      } else {
        originalHTML = existingOriginalTranslationCache.translatedHTML;
        originalHTMLHash = existingOriginalTranslationCache.originalHTMLHash;
      }

      // locale mapping required? next locale -> deepl locale
      const translatedHTML = await cachedTranslateHTML(originalHTML, locale);

      try {
        await prisma.contentfulTranslationCache.upsert({
          where: {
            id: {
              contentfulId,
              fieldId,
              locale,
            },
          },
          create: {
            contentfulId,
            contentType,
            fieldId,
            locale,
            translatedHTML,
            originalHTMLHash,
          },
          update: {
            translatedHTML,
            originalHTMLHash,
          },
        });
      } catch (error) {
        console.log(
          'error saving translated entry',
          error,
          fieldId,
          contentType,
          locale,
          contentfulId,
        );
      }

      return translatedHTML;
    } catch (e) {
      if (
        e &&
        typeof e === 'object' &&
        'message' in e &&
        typeof e.message === 'string' &&
        e.message.includes('Unique constraint failed')
      ) {
        // simultanious calls of this function can result in a failing create operation of the cache entry if the unique constraint is already occupied.
        const cachedTranslation = await getCachedLocalizedHTML({
          contentfulId,
          fieldId,
          locale,
          contentType,
        });

        if (cachedTranslation) {
          return cachedTranslation;
        }
      }

      console.log(
        'error translating entry field, return original text',
        e,
        fieldId,
        contentType,
        locale,
        contentfulId,
      );
      // return original if database is unavailable
      const entry = await getCachedById<Record<string, unknown>>(contentfulId);
      return getHTMLStringFromFieldValue(entry.fields[fieldId]);
    }
  },
);

const translationApiReturnSchema = z.object({
  translations: z
    .array(
      z.object({
        text: z.string(),
      }),
    )
    .length(1),
});

const envSchema = z.object({
  TRANSLATION_REPO_DEEPL_API_URL: z.string(),
  TRANSLATION_REPO_DEEPL_API_TOKEN: z.string(),
});

async function translateHTML(
  html: string,
  target_lang: string,
): Promise<string> {
  const {
    TRANSLATION_REPO_DEEPL_API_URL: apiUrl,
    TRANSLATION_REPO_DEEPL_API_TOKEN: apiToken,
  } = envSchema.parse(process.env);

  const res = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      text: [html],
      target_lang,
      source_lang: 'EN',
      tag_handling: 'html',
    }),
    headers: {
      Authorization: `DeepL-Auth-Key ${apiToken}`,
      'Content-Type': 'application/json',
    },
  });

  let resJSON;
  try {
    resJSON = await res.json();
  } catch (error) {
    console.log('translation api: Failed to parse json response', error);
  }

  try {
    return translationApiReturnSchema.parse(resJSON).translations[0].text;
  } catch (error) {
    console.log(
      'translation api: Failed to parse json schema and extract the first translation',
      error,
      resJSON,
    );
    throw error;
  }
}
