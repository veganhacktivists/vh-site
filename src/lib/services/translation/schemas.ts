import { z } from 'zod';

export const getLocalizedHTMLSchema = z.object({
  contentfulId: z.string(),
  fieldId: z.string(),
  locale: z.string(),
  contentType: z.string(),
});
