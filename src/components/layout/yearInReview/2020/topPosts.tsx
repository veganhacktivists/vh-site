import Link from 'next/link';

import getServerIntl from 'app/intl';

import type { IBlogEntryFields } from 'types/generated/contentful';

interface TopPostsProps {
  topPosts: Pick<IBlogEntryFields, 'title' | 'slug'>[];
  locale: string;
}

const TopPosts: React.FC<TopPostsProps> = ({ topPosts, locale }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <h2 className='text-3xl font-mono font-bold text-white mb-8'>
        {intl.formatMessage({
          id: 'page.year-in-review.2020.section.by-the-numbers.top-posts',
          defaultMessage: 'TOP POSTS',
        })}
      </h2>
      <div className='flex flex-col normal-case'>
        {topPosts.map(({ title, slug }) => (
          <Link
            key={slug}
            href={`/${locale}/blog/${slug}`}
            className='text-white text-2xl underline active:opacity-50 cursor-pointer truncate'
          >
            {title}
          </Link>
        ))}
      </div>
    </>
  );
};
export default TopPosts;
