'use client';

import BlogEntrySummaryClient from './blogEntrySummaryClient';

import { useLocalizedContentfulEntryField } from 'components/localization/LocalizedContentfulEntryField';

import type { IBlogEntry } from 'types/generated/contentful';

interface BlogEntrySummaryProps {
  blog: IBlogEntry;
  heading?: boolean;
  className?: string;
  locale: string;
}

const BlogEntrySummaryPages = (props: BlogEntrySummaryProps) => {
  const titleTranslation = useLocalizedContentfulEntryField({
    contentfulId: props.blog.sys.id,
    fieldId: 'title',
    contentType: 'blogEntry',
  });

  const excerptTranslation = useLocalizedContentfulEntryField({
    contentfulId: props.blog.sys.id,
    fieldId: 'excerpt',
    contentType: 'blogEntry',
  });

  return (
    <BlogEntrySummaryClient
      {...props}
      titleTranslation={{ [props.locale]: titleTranslation }}
      excerptTranslation={{ [props.locale]: excerptTranslation }}
    />
  );
};

export default BlogEntrySummaryPages;
