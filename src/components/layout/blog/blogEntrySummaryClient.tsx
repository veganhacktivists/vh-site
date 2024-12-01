'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import ContentfulImage from '../contentfulImage';

import BlogEntrySummaryTitle from './blogEntrySummaryTitle';

import { DarkButton } from 'components/decoration/buttons';
import LocalizedContentfulEntryFieldClient from 'app/_localization/LocalizedContentfulEntryFieldClient';

import type { IBlogEntry } from 'types/generated/contentful';

interface BlogEntrySummaryProps {
  blog: IBlogEntry;
  heading?: boolean;
  className?: string;
  titleTranslation: Record<string, string>;
  excerptTranslation: Record<string, string>;
  locale: string;
}

const BlogEntrySummaryClient = ({
  blog,
  heading,
  titleTranslation,
  excerptTranslation,
  locale,
}: BlogEntrySummaryProps) => {
  const currentYear = new Date().getFullYear();

  const intl = useIntl();
  const date = new Date(blog.fields.publishDate || blog.sys.createdAt);

  const LinkToBlog: React.FC<React.PropsWithChildren> = ({ children }) => (
    <Link
      href={`/${locale}/blog/${blog.fields.slug}`}
      aria-label={blog.fields.title}
    >
      {children}
    </Link>
  );

  const { slug, featuredImage } = blog.fields;

  return (
    <div
      className={classNames('h-full grid overflow-hidden grid-cols-1', {
        'md:grid-cols-2': heading,
      })}
    >
      <div
        className={classNames('w-full overflow-hidden relative h-full', {
          'md:max-h-20 lg:max-h-44 4xl:max-h-64': !heading,
        })}
      >
        <LinkToBlog>
          <ContentfulImage
            image={featuredImage}
            alt=''
            className='h-full object-contain object-top'
          />
        </LinkToBlog>
        {heading && (
          <div className='p-1 md:p-2 bottom-0 text-white uppercase md:text-xl absolute bg-black border-white border-[3px] border-l-0 border-b-0'>
            {intl.formatMessage({
              id: 'page.blog.section.blog-summary.heading-fallback',
              defaultMessage: 'Latest post',
            })}
          </div>
        )}
      </div>
      <div className='flex flex-col'>
        <div className='p-5 my-auto'>
          <div
            className={classNames('text-xl font-mono font-bold', {
              'mb-3': !heading,
            })}
          >
            {new Intl.DateTimeFormat(locale, {
              month: 'long',
              year: date.getFullYear() !== currentYear ? 'numeric' : undefined,
              day: 'numeric',
            }).format(date)}
          </div>
          <LinkToBlog>
            <BlogEntrySummaryTitle title={titleTranslation} />
          </LinkToBlog>
          <div className='text-xl line-clamp-5 md:line-clamp-1 lg:line-clamp-2 2xl:line-clamp-4 2xl:pt-5'>
            <LocalizedContentfulEntryFieldClient
              translatedEntryField={excerptTranslation}
            />
          </div>
        </div>
        {heading || (
          <DarkButton className='mb-0' href={`/${locale}/blog/${slug}`}>
            {intl.formatMessage({
              id: 'page.blog.section.blog-summary.read-more',
              defaultMessage: 'Read More',
            })}
          </DarkButton>
        )}
      </div>
    </div>
  );
};

export default BlogEntrySummaryClient;
