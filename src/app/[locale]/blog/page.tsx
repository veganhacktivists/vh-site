import React from 'react';
import { unstable_cache } from 'next/cache';

import { BlogOverviewContainer } from './_components/BlogOverviewContainer';

import { getBlogEntries } from 'lib/cms/helpers';
import SquareField from 'components/decoration/squares';
import Newsletter from 'components/layout/newsletter';
import { getContents } from 'lib/cms';
import getServerIntl from 'app/intl';
import { getTranslatedEntryField } from 'app/_localization/getTranslatedEntry';

import type {
  IBlogEntry,
  ITag,
  ITagFields,
} from '../../../types/generated/contentful';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string };
}

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const intl = getServerIntl(locale);

  return {
    title: intl.formatMessage({
      id: 'page.blog.next-seo.title',
      defaultMessage: 'Blog',
    }),
  };
}

export type TanslatedBlogEntry = IBlogEntry & {
  titleTranslation: Record<string, string>;
  excerptTranslation: Record<string, string>;
};

const getContent = unstable_cache(async () => {
  return await Promise.all([
    getBlogEntries() as Promise<IBlogEntry[]>,
    getContents<ITagFields>({
      contentType: 'tag',
    }) as Promise<ITag[]>,
  ]);
});

const Blog: React.FC<Props> = async ({ params: { locale } }) => {
  const [blogs, tags] = await getContent();

  const translatedBlogEntries = await Promise.all(
    blogs.map(async (blog) => {
      const translatedBlog = blog as TanslatedBlogEntry;

      const titleTranslation = await getTranslatedEntryField(
        {
          contentfulId: blog.sys.id,
          fieldId: 'title',
          contentType: 'blogEntry',
        },
        locale,
      );

      translatedBlog.titleTranslation = titleTranslation;

      const excerptTranslation = await getTranslatedEntryField(
        {
          contentfulId: blog.sys.id,
          fieldId: 'excerpt',
          contentType: 'blogEntry',
        },
        locale,
      );

      translatedBlog.excerptTranslation = excerptTranslation;

      return translatedBlog;
    }),
  );

  return (
    <>
      <SquareField
        squares={[
          { color: 'grey', size: 32, top: 0, left: 0 },
          { color: 'grey-dark', size: 16, top: 0, left: 32 },
          { color: 'grey-dark', size: 16, top: 0, right: 0 },
        ]}
        className='z-10 hidden md:block'
      />
      <BlogOverviewContainer
        blogs={translatedBlogEntries}
        tags={tags}
        locale={locale}
      />
      <SquareField
        squares={[
          { color: 'grey-background', size: 16, bottom: 0 },
          { color: 'grey-light', size: 16, top: 0, right: 0 },
          { color: 'grey-background', size: 16, bottom: 0, right: 0 },
        ]}
        className='hidden md:block'
      />
      <div className='bg-grey-background'>
        <Newsletter />
      </div>
    </>
  );
};

export default Blog;
