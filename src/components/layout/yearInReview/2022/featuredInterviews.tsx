import React from 'react';

import SectionContainer from '../sectionContainer';
import { SectionHeader } from '../../../decoration/textBlocks';

import SubtleBorder from 'components/decoration/subtleBorder';
import { api } from 'trpc/server';
import { DarkButton } from 'components/decoration/buttons';
import BlogEntrySummaryPages from 'components/layout/blog/blogEntrySummary_pages';
import getServerIntl from 'app/intl';

interface FeaturedInterviewsProps {
  interviews: string[];
  locale: string;
}

const FeaturedInterviews: React.FC<FeaturedInterviewsProps> = async ({
  interviews,
  locale,
}) => {
  const intl = getServerIntl(locale);

  const blogs = await api.blog.getBlogsBySlugs(interviews);

  return (
    <>
      <SectionContainer
        header={
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.year-in-review.2022.section.featured-interviews.headline',
              defaultMessage: 'Featured <b>interviews</b>',
            })}
          />
        }
      >
        <div className='text-xl md:w-2/3 mx-auto pb-16'>
          {intl.formatMessage({
            id: 'page.year-in-review.2022.section.featured-interviews.paragraph',
            defaultMessage:
              'Earlier in the year, we had the honor of sitting down with diverse leaders in animal protection. We were inspired by their origin stories, words of wisdom, and their openness and candor in sharing their experiences with us — and hope you are too.',
          })}
        </div>
        <div className='grid md:grid-cols-3 md:gap-x-12 gap-y-10 xl:w-2/3 mx-auto auto-rows-min pb-20'>
          {blogs &&
            blogs.map((blog) => {
              return (
                <SubtleBorder
                  key={blog.fields.slug}
                  className='col-span-full md:col-span-1'
                >
                  <BlogEntrySummaryPages blog={blog} locale={intl.locale} />
                </SubtleBorder>
              );
            })}
        </div>
        <div className='flex justify-center pb-20'>
          <DarkButton className='mb-0' href={`/${intl.locale}/blog`}>
            {intl.formatMessage({
              id: 'page.year-in-review.2022.section.featured-interviews.btn.cta',
              defaultMessage: 'Read More on the Blog',
            })}
          </DarkButton>
        </div>
      </SectionContainer>
    </>
  );
};

export default FeaturedInterviews;
