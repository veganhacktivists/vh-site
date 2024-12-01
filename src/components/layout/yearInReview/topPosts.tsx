import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';

import type { IBlogEntryFields } from '../../../types/generated/contentful';

interface TopPostsProps {
  topPosts: Pick<IBlogEntryFields, 'title' | 'slug'>[];
}

const TopPosts: React.FC<TopPostsProps> = ({ topPosts }) => {
  const intl = useIntl();
  return (
    <>
      <h2 className='text-3xl font-mono font-bold text-white mb-8'>
        <FormattedMessage
          id='page.year-in-review.2020.section.by-the-numbers.top-posts'
          defaultMessage='TOP POSTS'
        />
      </h2>
      <div className='flex flex-col normal-case'>
        {topPosts.map(({ title, slug }) => (
          <Link
            key={slug}
            href={`/${intl.locale}/blog/${slug}`}
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
