import { DarkButton } from '../../../decoration/buttons';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';
import CustomImage from '../../../decoration/customImage';

import newsletter from '../../../../../public/images/yearInReview/2021/newsletter.png';
import React from 'react';
import SquareField from '../../../decoration/squares';

const NewsletterLaunch: React.FC = () => {
  return (
    <>
      <SectionContainer color="grey-background" className="pb-0">
        <div className="flex flex-col md:flex-row gap-x-24 gap-y-10 md:w-2/3 justify-center mx-auto">
          <div className="md:text-left md:w-2/3">
            <SectionHeader
              header="Newsletter Launch"
              className="text-grey"
              startWithBoldFont
            />
            <div className="mb-10 mt-5">
              This year we&apos;ve been very fortunate to have a huge growth of
              interest in the vegan movement. Many have asked us to launch a
              newsletter to stay updated with our progress. This year we
              launched newsletters for most of our major projects, and one for
              everything. We&apos;ve accumulated over 15,000 emails from our
              community which has been an overwhelming success. Signup for our
              newsletter!
            </div>
            <DarkButton
              className="w-min font-semibold font-mono md:mb-10 mx-auto md:mx-0"
              href="/newsletter"
              linkProps={{ target: '_blank', rel: 'noreferrer' }}
            >
              Sign up for our newsletter!
            </DarkButton>
          </div>
          <div className="max-w-screen-sm mb-10">
            <CustomImage src={newsletter} alt="" />
          </div>
        </div>
      </SectionContainer>
      <SquareField
        className="hidden md:block"
        squares={[
          { color: 'grey-background', left: 0, top: 0 },
          { color: 'grey-background', right: 0, top: 0 },
        ]}
      />
    </>
  );
};

export default NewsletterLaunch;
