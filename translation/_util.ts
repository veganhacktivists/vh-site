import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

import { z } from 'zod';

const nextConfig = z
  .object({
    i18n: z.object({ locales: z.array(z.string()), defaultLocale: z.string() }),
  })
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  .parse(require('../next.config.js'));

export const filesGlob = 'src/**/*.tsx';
export const defaultLanguage = nextConfig.i18n.defaultLocale;
export const languages = nextConfig.i18n.locales;
export const defaultTranslationPath =
  resolveTranslationFilePath(defaultLanguage);
export const defaultCompiledTranslationPath =
  resolveCompiledTranslationFilePath(defaultLanguage);
export const encoding = 'utf-8';
export const repoDirectory = resolve(__dirname, '..');

export const validationSchema = z.record(
  z.string(),
  z.object({
    defaultMessage: z.string(),
  })
);

export type TranslationFileStructure = z.infer<typeof validationSchema>;

export async function getTranslationsFromFile(
  path: string
): Promise<TranslationFileStructure> {
  try {
    const contents = await readFile(path, { encoding });

    return validationSchema.parse(JSON.parse(contents));
  } catch {
    return {};
  }
}

export function resolveTranslationFilePath(language: string) {
  return `${__dirname}/data/${language}.json`;
}

export function resolveCompiledTranslationFilePath(language: string) {
  return `${__dirname}/data/compiled-${language}.json`;
}

export async function readTranslationFile(
  language: string
): Promise<z.infer<typeof validationSchema>> {
  const referenceTranslationFileString = await readFile(
    resolveTranslationFilePath(language),
    { encoding }
  );

  const referenceTranslationFileContent = validationSchema.parse(
    JSON.parse(referenceTranslationFileString)
  );

  return referenceTranslationFileContent;
}

export function validateTranslationId(id: string) {
  return id.toLowerCase() === id && !id.includes(' ');
}

export function warnIfIdInvalid(id: string) {
  if (!validateTranslationId(id)) {
    console.warn(
      'id must be lower cased in kebab-style and may not contain white spaces, invalid id:',
      id
    );
  }
}

export function sortTranslations(translations: TranslationFileStructure) {
  return Object.fromEntries(
    Object.entries(translations).sort(([keya], [keyb]) =>
      keya.localeCompare(keyb)
    )
  );
}

export async function writeToTranslationFile(
  translations: TranslationFileStructure,
  locale: string
) {
  await writeFile(
    resolveTranslationFilePath(locale),
    JSON.stringify(sortTranslations(translations), undefined, 2),
    { encoding }
  );
}
