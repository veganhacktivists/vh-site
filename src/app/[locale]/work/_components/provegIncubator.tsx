import React, { Fragment } from 'react';

import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';
import { DarkButton } from 'components/decoration/buttons';
import getServerIntl from 'app/intl';

import ProvegIncubatorImage from '~images/work/PV_Incubator_Logo_NEW_1.png';

const TOP_DECORATION_SQUARES = [
  { color: 'yellow', size: 16, right: 0, top: 0 },
  { color: 'grey-background', size: 16, left: 0, top: 0 },
];

interface ProvegIncubatorProps {
  locale: string;
}

const ProvegIncubator: React.FC<ProvegIncubatorProps> = ({
  locale,
}: ProvegIncubatorProps) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='mx-auto w-fit'>
        <div className='flex flex-col pb-32 pt-20 px-5 text-left lg:max-w-[1000px] lg:mx-auto'>
          <div className='flex flex-col lg:flex-row items-center justify-start gap-20 mt-10 lg:mt-20'>
            <div className='max-w-prose space-y-10 lg:basis-[50%]'>
              <SectionHeader
                header={intl.formatMessage({
                  id: 'page.our-work.section.proveg-incubator.section-header.headline',
                  defaultMessage: '<b>ACCELERATE YOUR AI IDEA FOR ANIMALS</b>',
                })}
                rootClassName='text-left mx-auto text-center lg:text-left w-full mb-0'
              >
                <p className='text-xl'>
                  {intl
                    .formatMessage({
                      id: 'page.our-work.section.proveg-incubator.content',
                      defaultMessage:
                        'Vegan Hacktivists and Violet Studios is collaborating with ProVeg’s Kickstarting for Good incubator to leverage Artificial Intelligence (AI) for transforming our food system. Together, we are looking for the most impactful approaches and best talent in this area! <no-localization>{break}{break}</no-localization> Join us if you’re ready to bring to life ideas that can significantly enhance the global food ecosystem. Applications for our 2024 cohort are now open until May 26th!',
                    })
                    .split('{break}')
                    .map((item, index) => (
                      <Fragment key={index}>
                        {item}
                        <br />
                      </Fragment>
                    ))}
                </p>
              </SectionHeader>

              <DarkButton
                href='https://provegincubator.com/kickstartingforgood/'
                newTab
                className='w-fit mx-auto lg:mx-0'
              >
                {intl.formatMessage({
                  id: 'page.our-work.section.proveg-incubator.cta',
                  defaultMessage: 'Apply now',
                })}
              </DarkButton>
            </div>
            <div className='px-10 lg:p-0 lg:basis-[50%]'>
              <CustomImage
                alt='ACCELERATE YOUR AI IDEA FOR ANIMALS'
                src={ProvegIncubatorImage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProvegIncubator;
