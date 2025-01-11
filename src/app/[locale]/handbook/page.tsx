'use server';

import { redirect } from 'next/navigation';

import { getContents } from '../../../lib/cms';
import { defaultLocale } from '../../../../translation/defaultLocale';

import type { IDocsCategoryFields } from '../../../types/generated/contentful';

const Docs: React.FC = async () => {
  const cats = await getContents<IDocsCategoryFields>({
    contentType: 'docsCategory',
    other: {
      order: 'fields.order',
      select: 'fields.slug,fields.sections',
      include: 3,
      limit: 1,
    },
  });

  const firstCategory = cats[0].fields;

  const firstCategorySlug = firstCategory.slug;
  const firstSectionSlug = firstCategory.sections[0].fields.slug;

  return redirect(
    `/${defaultLocale}/handbook/${firstCategorySlug}/${firstSectionSlug}`,
  );
};

export default Docs;
