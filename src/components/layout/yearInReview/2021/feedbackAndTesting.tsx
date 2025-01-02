import React from 'react';

import Sprite, { chicken } from '../../../decoration/sprite';
import SquareField from '../../../decoration/squares';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';

import getServerIntl from 'app/intl';

interface Props {
  locale: string;
}

const FeedbackAndTesting: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        squares={[
          { size: 16, left: 0, bottom: 0, color: 'grey-background' },
          { size: 16, right: 0, bottom: 0, color: 'grey-lighter' },
          { size: 16, right: 0, top: 0, color: 'grey' },
        ]}
        className='hidden md:block z-10'
      />
      <SectionContainer
        header={
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.year-in-review.2021.section.feedback-and-testing.headline',
              defaultMessage: '<b>Feedback</b> and <b>testing</b>',
            })}
          />
        }
        color='grey-dark'
        className='text-white relative'
        circles
      >
        <div className='md:w-2/3 mx-auto'>
          <p className='mb-10'>
            {intl.formatMessage({
              id: 'page.year-in-review.2021.section.feedback-and-testing.paragraph.0',
              defaultMessage:
                'To be more effective and meet the needs of our movement, we not only expanded our advisory team, but we expanded how we receive feedback. We used a combination of internal polls, newsletters, advisors, and testers to determine next steps for both our projects in development and our own growth.',
            })}
          </p>
          <p className='mb-20'>
            {intl.formatMessage({
              id: 'page.year-in-review.2021.section.feedback-and-testing.paragraph.1',
              defaultMessage:
                'Together we were able to launch several surveys for before, during, and after projects in order to collect better data on requested features and issues. We are extremely pleased to say that we made meaningful changes based on over 80% of the individual feedback received from testers.',
            })}
          </p>
        </div>
      </SectionContainer>
      <div className='relative'>
        <Sprite image={chicken} pixelsLeft={1} pixelsRight={1} />
      </div>
      <SquareField
        squares={[
          { left: 0, bottom: 0, size: 16, color: 'grey' },
          { left: 0, top: 0, size: 16, color: 'grey-light' },
          { right: 0, bottom: 0, size: 16, color: 'grey-light' },
        ]}
        className='hidden md:block'
      />
    </>
  );
};

export default FeedbackAndTesting;
