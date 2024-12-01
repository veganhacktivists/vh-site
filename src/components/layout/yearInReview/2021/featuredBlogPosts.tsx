import React from 'react';
import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';

import SquareField from '../../../decoration/squares';
import { SectionHeader } from '../../../decoration/textBlocks';
import ContentfulImage from '../../contentfulImage';
import SectionContainer from '../sectionContainer';

import type {
  IBlogEntry,
  ITeamMember,
} from '../../../../types/generated/contentful';

export interface BlogPostItem {
  member: ITeamMember;
  blogEntry: IBlogEntry;
}
export interface FeaturedBlogPostsProps {
  featuredBlogPosts: BlogPostItem[];
}

const FeaturedBlogPosts: React.FC<FeaturedBlogPostsProps> = ({
  featuredBlogPosts,
}) => {
  const intl = useIntl();

  return (
    <>
      <SectionContainer
        header={
          <SectionHeader
            className='text-grey'
            header={intl.formatMessage({
              id: 'page.year-in-review.2021.section.featured-blog-posts.intro.headline',
              defaultMessage: 'Featured <b>blog posts</b>',
            })}
          >
            <FormattedMessage
              id='page.year-in-review.2021.section.featured-blog-posts.intro.paragraph'
              defaultMessage="We've been having fun with our blog! We launched our “Meet The Team” series so we could feature the incredible work done by our team and spotlight the dedicated volunteers behind the scenes. We plan to deliver more amazing content in 2022. Stay tuned!"
            />
          </SectionHeader>
        }
      >
        <div className='flex flex-col flex-wrap md:flex-row gap-5 justify-center mx-auto md:pb-20 mb-10 md:mt-5'>
          {featuredBlogPosts.map(({ member, blogEntry }) => {
            const { name, team, image } = member.fields;
            const color = team?.fields.color;

            if (!color || !image) {
              return null;
            }

            return (
              <Link
                href={{
                  pathname: `/${intl.locale}/blog/[slug]`,
                  query: { slug: blogEntry.fields.slug },
                }}
                key={blogEntry.fields.slug}
                target='_blank'
              >
                <div className='w-64 md:w-52 mx-auto'>
                  <div className='flex justify-end group aspect-square'>
                    <div className='relative h-min'>
                      <ContentfulImage image={image} alt={name} />
                      <div
                        className={
                          'left-0 top-0 w-full h-full absolute opacity-10'
                        }
                        style={{
                          backgroundColor: color,
                        }}
                      />
                    </div>
                    <div
                      style={{ backgroundColor: color }}
                      className={'absolute w-8 h-8'}
                    />
                  </div>
                  <div
                    style={{ backgroundColor: color }}
                    className='font-bold p-5 mt-2'
                  >
                    <FormattedMessage
                      id='page.year-in-review.2021.section.featured-blog-posts.team-member-introduction'
                      defaultMessage='Meet <no-localization>{name}</no-localization>'
                      values={{
                        name: name.includes('Suan')
                          ? name.split(' ').slice(0, 2).join(' ')
                          : name.split(' ')[0],
                      }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </SectionContainer>
      <SquareField
        className='hidden md:block'
        squares={[
          { color: 'grey-background', left: 0, bottom: 0 },
          { color: 'white', left: 32, top: 0 },
          { color: 'grey-background', right: 0, bottom: 0 },
          { color: 'white', right: 0, top: 0 },
        ]}
      />
    </>
  );
};

export default FeaturedBlogPosts;
