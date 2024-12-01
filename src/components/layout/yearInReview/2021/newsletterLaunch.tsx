import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { DarkButton } from '../../../decoration/buttons';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';
import SquareField from '../../../decoration/squares';
import newsletter from '../../../../../public/images/yearInReview/2021/newsletter.png';

import CustomImage from 'components/decoration/customImage';

const NewsletterLaunch: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <SectionContainer color='grey-background' className='pb-0'>
        <div className='flex flex-col justify-center mx-auto md:flex-row gap-x-24 gap-y-10 md:w-2/3'>
          <div className='md:text-left md:w-2/3'>
            <SectionHeader
              header={intl.formatMessage({
                id: 'page.year-in-review.2021.section.newsletter-launch.heading',
                defaultMessage: '<b>Newsletter Launch</b>',
              })}
              className='text-grey'
            />
            <div className='mt-5 mb-10'>
              <FormattedMessage
                id='page.year-in-review.2021.section.newsletter-launch.paragraph'
                defaultMessage="Much has been happening in the vegan movement, and we are excited to be part of those changes. To keep you up-to-date with our progress, we have launched a monthly newsletter to showcase our projects and general happenings. We've accumulated over 15,000 emails from our community to date. Sign up for our newsletter today!"
              />
            </div>
            <DarkButton
              className='mx-auto font-mono font-semibold w-min md:mb-10 md:mx-0'
              href={`/${intl.locale}/newsletter`}
              newTab
            >
              <FormattedMessage
                id='page.year-in-review.2021.section.newsletter-launch.btn.cta'
                defaultMessage='Sign up for our newsletter!'
              />
            </DarkButton>
          </div>
          <div className='relative max-w-screen-sm mb-10 h-min'>
            <CustomImage src={newsletter} alt='' />
            <div className='absolute bottom-0 w-full h-80 bg-gradient-to-t from-grey-background to-invisible' />
          </div>
        </div>
      </SectionContainer>
      <SquareField
        className='hidden md:block'
        squares={[
          { color: 'grey-background', left: 0, top: 0 },
          { color: 'grey-background', right: 0, top: 0 },
        ]}
      />
    </>
  );
};

export default NewsletterLaunch;
