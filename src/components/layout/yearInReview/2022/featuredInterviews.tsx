import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import SectionContainer from '../sectionContainer';
import { SectionHeader } from '../../../decoration/textBlocks';

import SubtleBorder from 'components/decoration/subtleBorder';
import { api } from 'trpc/react';
import { DarkButton } from 'components/decoration/buttons';
import Spinner from 'components/decoration/spinner';
import BlogEntrySummaryPages from 'components/layout/blog/blogEntrySummary_pages';

interface FeaturedInterviewsProps {
  interviews: string[];
}

const FeaturedInterviews: React.FC<FeaturedInterviewsProps> = ({
  interviews,
}) => {
  const intl = useIntl();

  const {
    data: blogs,
    isPending: isLoading,
    isError,
  } = api.blog.getBlogsBySlugs.useQuery(interviews);

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
          <FormattedMessage
            id='page.year-in-review.2022.section.featured-interviews.paragraph'
            defaultMessage='Earlier in the year, we had the honor of sitting down with diverse leaders in animal protection. We were inspired by their origin stories, words of wisdom, and their openness and candor in sharing their experiences with us — and hope you are too.'
          />
        </div>
        {isLoading && !isError && (
          <div>
            <span className='block mb-1'>
              <FormattedMessage
                id='page.year-in-review.2022.section.featured-interviews.loading-spinner'
                defaultMessage='Loading'
              />
            </span>
            <Spinner />
          </div>
        )}
        <div className='grid md:grid-cols-3 md:gap-x-12 gap-y-10 xl:w-2/3 mx-auto auto-rows-min pb-20'>
          {!isLoading &&
            !isError &&
            blogs &&
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
            <FormattedMessage
              id='page.year-in-review.2022.section.featured-interviews.btn.cta'
              defaultMessage='Read More on the Blog'
            />
          </DarkButton>
        </div>
      </SectionContainer>
    </>
  );
};

export default FeaturedInterviews;
