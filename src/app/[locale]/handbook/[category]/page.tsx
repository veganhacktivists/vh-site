'use server';

import { redirect } from 'next/navigation';

import { getContents } from '../../../../lib/cms';
import { getDocCategoryPreviewBySlug } from '../../../../lib/cms/helpers';
import { defaultLocale } from '../../../../../translation/defaultLocale';

import type {
  IDocsCategory,
  IDocsCategoryFields,
} from '../../../../types/generated/contentful';

const getCategoryOrPreview: (
  slug: IDocsCategoryFields['slug'],
  preview: boolean,
) => Promise<IDocsCategory> = async (slug, preview) => {
  if (preview) {
    return await getDocCategoryPreviewBySlug(slug);
  }
  const cats = await getContents<IDocsCategoryFields>({
    contentType: 'docsCategory',
    query: {
      slug,
    },
    other: {
      order: 'fields.order',
      select: 'fields.sections',
      include: 1,
      limit: 1,
    },
  });

  return cats[0] as IDocsCategory;
};

const Docs: React.FC<{ params: { category: string } }> = async ({
  params: { category: categoryParam },
}) => {
  const category = await getCategoryOrPreview(categoryParam, false);

  const categorySlug = categoryParam;
  const firstSectionSlug = category.fields.sections[0].fields.slug;

  return redirect(
    `´/${defaultLocale}/handbook/${categorySlug}/${firstSectionSlug}`,
  );
};

export default Docs;
