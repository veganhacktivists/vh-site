import prisma from '../../db/prisma';
import { defaultLocale } from '../../../../translation/defaultLocale';

import { getById } from 'lib/cms';
import {
  getHTMLStringFromFieldValue,
  getLocalizedHTMLHash,
} from 'lib/services/translation/helper';

import type { Entry } from 'contentful';

export async function invalidateContentfulTranslationCache() {
  const allCachedTranslations =
    await prisma.contentfulTranslationCache.findMany({
      where: { locale: defaultLocale },
    });

  const entryCache: Record<string, Entry<Record<string, unknown>>> = {};

  const cacheEntitiesToDelete: typeof allCachedTranslations = [];

  for (const cachedTranslation of allCachedTranslations) {
    entryCache[cachedTranslation.contentfulId] ??= await getById<
      Record<string, unknown>
    >(cachedTranslation.contentfulId);

    const entry = entryCache[cachedTranslation.contentfulId];

    const fieldValue = entry.fields[cachedTranslation.fieldId];

    const originalHtmlString = getHTMLStringFromFieldValue(fieldValue);

    if (!originalHtmlString) {
      cacheEntitiesToDelete.push(cachedTranslation);
      continue;
    }

    const hash = getLocalizedHTMLHash(originalHtmlString);

    if (cachedTranslation.originalHTMLHash !== hash) {
      cacheEntitiesToDelete.push(cachedTranslation);
    }
  }

  await prisma.contentfulTranslationCache.deleteMany({
    where: {
      OR: cacheEntitiesToDelete.map((cacheEntity) => ({
        AND: [
          { contentfulId: cacheEntity.contentfulId },
          { fieldId: cacheEntity.fieldId },
        ],
      })),
    },
  });
}
