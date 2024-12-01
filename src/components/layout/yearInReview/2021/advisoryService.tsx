import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import SectionContainer from '../sectionContainer';
import advisorService from '../../../../../public/images/yearInReview/2021/advisory.png';
import { SectionHeader } from '../../../decoration/textBlocks';
import { DarkButton } from '../../../decoration/buttons';
import SquareField from '../../../decoration/squares';

import CustomImage from 'components/decoration/customImage';

const AdvisoryService: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <SectionContainer>
        <div className='flex flex-col md:flex-row md:w-3/4 mx-auto gap-x-10 justify-center'>
          <div className='mx-auto w-2/3 md:w-[100rem] pb-5 md:pb-0 md:flex-grow'>
            <CustomImage src={advisorService} alt='' sizes='100vw' />
          </div>
          <div className='mx-auto md:text-left space-y-5 text-2xl px-5'>
            <SectionHeader
              header={intl.formatMessage({
                id: 'page.year-in-review.2021.section.advisory-service.headline',
                defaultMessage: 'Our new <b>advisory service</b>',
              })}
              className='text-grey'
            />
            <FormattedMessage
              id='page.year-in-review.2021.section.advisory-service.paragraph'
              defaultMessage="<p>We launched our newest service to connect people with our team of experts who have a wide range of experience and skills. We welcome vegan activists and organizations to count us as a resource for their tech, org structure, strategy, marketing, grant requests, and more.</p> <p>We've been very happy with this launch and we've received over 100+ requests for advice! We have been able to assist organizations such as <no-localization>Sinergia Animal, The Humane League, Vegan Tokyo, Mercy for Animals, PETA, Animal Rights Advocates</no-localization>, among many others.</p>"
              values={{
                p: (chunks) => <p>{chunks}</p>,
              }}
            />

            <div className='pb-10 pt-5'>
              <DarkButton
                href={`/${intl.locale}/services`}
                className='font-semibold font-mono w-min mx-auto md:mx-0 mt-5'
              >
                <FormattedMessage
                  id='page.year-in-review.2021.section.advisory-service.btn.cta'
                  defaultMessage='Check out our services'
                />
              </DarkButton>
            </div>
          </div>
        </div>
      </SectionContainer>
      <SquareField
        className='hidden md:block'
        squares={[
          { color: 'grey-light', left: 0, bottom: 0 },
          { color: 'grey', left: 0, top: 0 },
          { color: 'grey-light', right: 0, bottom: 0 },
        ]}
      />
    </>
  );
};

export default AdvisoryService;
