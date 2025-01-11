'use server';

import BlogEntrySummaryClient from './blogEntrySummaryClient';

import { getTranslatedEntryField } from 'app/_localization/getTranslatedEntry';

import type { IBlogEntry } from 'types/generated/contentful';

interface BlogEntrySummaryProps {
  blog: IBlogEntry;
  heading?: boolean;
  className?: string;
  locale: string;
}

const BlogEntrySummary = async (props: BlogEntrySummaryProps) => {
  const titleTranslation = await getTranslatedEntryField(
    {
      contentfulId: props.blog.sys.id,
      fieldId: 'title',
      contentType: 'blogEntry',
    },
    props.locale,
  );

  const excerptTranslation = await getTranslatedEntryField(
    {
      contentfulId: props.blog.sys.id,
      fieldId: 'excerpt',
      contentType: 'blogEntry',
    },
    props.locale,
  );

  return (
    <BlogEntrySummaryClient
      {...props}
      titleTranslation={titleTranslation}
      excerptTranslation={excerptTranslation}
    />
  );
};

export default BlogEntrySummary;
