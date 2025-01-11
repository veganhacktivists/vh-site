import { z } from 'zod';

const envSchema = z.object({
  TRANSLATION_REPO_DEEPL_API_URL: z.string(),
  TRANSLATION_REPO_DEEPL_API_TOKEN: z.string(),
});

const translationApiReturnSchema = z.object({
  translations: z
    .array(
      z.object({
        text: z.string(),
      }),
    )
    .length(1),
});

export async function translate(
  text: string,
  target_lang: string,
): Promise<string> {
  const {
    TRANSLATION_REPO_DEEPL_API_URL: apiUrl,
    TRANSLATION_REPO_DEEPL_API_TOKEN: apiToken,
  } = envSchema.parse(process.env);

  const res = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      text: [text],
      target_lang,
      source_lang: 'EN',
      tag_handling: 'xml',
      // why is outline detection disabled
      outline_detection: false,
      ignore_tags: ['no-localization'],
    }),
    headers: {
      Authorization: `DeepL-Auth-Key ${apiToken}`,
      'Content-Type': 'application/json',
    },
  });

  const resJSON = await res.json();

  return translationApiReturnSchema.parse(resJSON).translations[0].text;
}
