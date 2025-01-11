'use server';

import Link from 'next/link';

import { DarkButton } from '../../decoration/buttons';
import ContentfulImage from '../contentfulImage';

import LocalizedContentfulEntryField from 'app/_localization/LocalizedContentfulEntryField';
import getServerIntl from 'app/intl';

import type { IBlogEntry } from '../../../types/generated/contentful';

const BlogContentContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className='flex flex-col lg:flex-row gap-x-10 mt-10 w-3/4 mx-auto'>
      {children}
    </div>
  );
};

export const Body: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export const Sidebar: React.FC<{
  locale: string;
  blogs: IBlogEntry[];
}> = ({ blogs, locale }) => {
  const intl = getServerIntl(locale);

  return (
    <div className='bg-grey-background mb-10 h-full'>
      {blogs.map((blog) => {
        const { slug, featuredImage } = blog.fields;

        return (
          <div
            key={blog.fields.slug}
            title={blog.fields.title}
            className='p-5 w-full lg:w-96'
          >
            <div className='mb-4'>
              <Link href={`/${locale}/blog/${slug}`}>
                <ContentfulImage image={featuredImage} alt='' />
                <div className='font-bold text-xl md:text-2xl text-left line-clamp-3 mt-5'>
                  <LocalizedContentfulEntryField
                    contentfulId={blog.sys.id}
                    fieldId='title'
                    contentType='blogEntry'
                    locale={locale}
                  />
                </div>
              </Link>
            </div>

            <DarkButton href={`/${locale}/blog/${slug}`} className='w-full'>
              {intl.formatMessage({
                id: 'page.blog.section.blog-page.btn.read-more',
                defaultMessage: 'Read more',
              })}
            </DarkButton>
          </div>
        );
      })}
    </div>
  );
};

export default BlogContentContainer;
