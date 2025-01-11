import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

import { z } from 'zod';

import { locales } from '../i18nConfig';

import { defaultLocale } from './defaultLocale';

export const filesGlob = 'src/**/*.tsx';
export { defaultLocale, locales };
export const defaultTranslationPath = resolveTranslationFilePath(defaultLocale);
export const defaultCompiledTranslationPath =
  resolveCompiledTranslationFilePath(defaultLocale);
export const encoding = 'utf-8';
export const repoDirectory = resolve(__dirname, '..');

export const validationSchemaInternal = z.record(
  z.string(),
  z.object({
    message: z.string(),
    description: z.string().optional(),
  }),
);

export const validationSchemaFormatJS = z.record(
  z.string(),
  z.object({
    defaultMessage: z.string(),
    description: z.string().optional(),
  }),
);

export type TranslationFileStructureInternal = z.infer<
  typeof validationSchemaInternal
>;
type TranslationFileStructureFormatJS = z.infer<
  typeof validationSchemaFormatJS
>;

/**
 * map translations to a format consumable by weblate
 * https://docs.weblate.org/en/latest/formats/webextension.html
 */
export function mapFormatJSTranslationsToInternalFormat(
  translations: TranslationFileStructureFormatJS,
): TranslationFileStructureInternal {
  return validationSchemaInternal.parse(
    Object.fromEntries(
      Object.entries(translations).map(
        ([key, { defaultMessage: message, description }]) => [
          key,
          { message, description },
        ],
      ),
    ),
  );
}

export async function getTranslationsFromFile(
  path: string,
): Promise<TranslationFileStructureInternal> {
  try {
    const contents = await readFile(path, { encoding });

    return validationSchemaInternal.parse(JSON.parse(contents));
  } catch {
    return {};
  }
}

export function resolveTranslationFilePath(locale: string) {
  return `${__dirname}/data/${locale}.json`;
}

export function resolveCompiledTranslationFilePath(locale: string) {
  return `${__dirname}/data/compiled-${locale}.json`;
}

export async function readTranslationFile(
  locale: string,
): Promise<TranslationFileStructureInternal> {
  return getTranslationsFromFile(resolveTranslationFilePath(locale));
}

export async function writeTranslationFile(
  translations: TranslationFileStructureInternal,
  locale: string,
) {
  await writeFile(
    resolveTranslationFilePath(locale),
    JSON.stringify(sortTranslations(translations), undefined, 2) + '\n',
    { encoding },
  );
}

export function validateTranslationId(id: string) {
  return id.toLowerCase() === id && !/.*\s.*/.test(id);
}

export function warnIfIdInvalid(id: string) {
  if (!validateTranslationId(id)) {
    // eslint-disable-next-line no-console
    console.warn(
      'id must be lower cased in kebab-style and may not contain white spaces, invalid id:',
      id,
    );
  }
}

export function sortTranslations(
  translations: TranslationFileStructureInternal,
) {
  return Object.fromEntries(
    Object.entries(translations).sort(([keya], [keyb]) =>
      keya.localeCompare(keyb, 'en-US'),
    ),
  );
}

export function stripObsoleteTranslations(
  translations: TranslationFileStructureInternal,
  validIds: string[],
) {
  return Object.fromEntries(
    Object.entries(translations).filter(([id]) => validIds.includes(id)),
  );
}
