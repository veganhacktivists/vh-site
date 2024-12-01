'use server';

import React from 'react';

import { LightButton } from '../../decoration/buttons';
import BlogEntrySummary from '../blog/blogEntrySummary';
import SubtleBorder from '../../decoration/subtleBorder';

import { SectionHeader } from 'components/decoration/textBlocks';
import getServerIntl from 'app/intl';

import type { IBlogEntry } from '../../../types/generated/contentful';

const LastBlogEntries: React.FC<{ entries: IBlogEntry[]; locale: string }> = ({
  entries,
  locale,
}) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <div className='content-center mx-auto md:w-1/2 text-2xl pt-16'>
        <div className='text-grey-dark pb-5'>
          <SectionHeader
            header={intl.formatMessage({
              id: 'section.blog-teaser.headline',
              defaultMessage: 'On the <b>BLOG</b>',
            })}
          />
        </div>
        <p className='pb-16'>
          {intl.formatMessage({
            id: 'section.blog-teaser.paragraph',
            defaultMessage:
              'Read our blog post for project updates, announcements, interviews, guest editorials, and much more.',
          })}
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 md:gap-x-4 md:gap-y-2 gap-y-4 lg:px-32 px-4'>
        {entries.map((entry) => (
          <SubtleBorder border={false} key={entry.fields.slug}>
            <BlogEntrySummary blog={entry} locale={locale} />
          </SubtleBorder>
        ))}
      </div>
      <div className='bg-grey w-full relative h-32 bottom-32 -z-10' />
      <div className='bg-grey relative bottom-32 -pb-32 -mb-32'>
        <div className='relative mx-auto pt-10 md:w-1/3 pb-16 sm:px-24 px-20'>
          <LightButton
            href={`/${locale}/blog`}
            className='font-mono font-semibold'
          >
            {intl.formatMessage({
              id: 'section.blog-teaser.cta',
              defaultMessage: 'See All Posts',
            })}
          </LightButton>
        </div>
      </div>
    </>
  );
};

export default LastBlogEntries;
