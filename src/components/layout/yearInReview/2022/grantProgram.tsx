import React from 'react';

import CustomImage from 'components/decoration/customImage';
import { SectionHeader } from 'components/decoration/textBlocks';
import SquareField from 'components/decoration/squares';
import AnimatedNumber from 'components/decoration/animatedNumber';
import getServerIntl from 'app/intl';

import Bee from '~images/yearInReview/2022/bee.png';
import GrantApplicants from '~images/yearInReview/2022/grant-applicants.png';
import GrantGranted from '~images/yearInReview/2022/grant-granted.png';
import GrantFunded from '~images/yearInReview/2022/grant-funded.png';

interface Props {
  locale: string;
}

const GrantProgram: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <div>
        <SquareField
          squares={[
            {
              right: 0,
              top: 0,
              color: 'yellow-dark',
              size: 16,
            },
            {
              right: 0,
              bottom: 0,
              color: 'yellow',
              size: 16,
            },
            {
              left: 0,
              bottom: 0,
              color: 'grey-lighter',
              size: 16,
            },
          ]}
        />
        <div className='flex flex-row flex-wrap bg-grey-background'>
          <div className='w-full md:w-1/2 bg-grey-background pl-5'>
            <div className='xl:w-2/3 ml-auto py-20'>
              <div className='pr-5 xl:pr-20'>
                <div className='flex'>
                  <CustomImage alt='bee' width={73} height={76} src={Bee} />
                </div>
                <SectionHeader
                  header={intl.formatMessage({
                    id: 'page.year-in-review.2022.section.grant-program.headline',
                    defaultMessage: 'An update of our <b>grant program</b>',
                  })}
                  stackEntries
                  className='text-left'
                />
                <div className='text-xl text-left pt-5 pb-10'>
                  {intl.formatMessage(
                    {
                      id: 'page.year-in-review.2022.section.grant-program.paragraph.0',
                      defaultMessage:
                        "Last year, we announced a partnership with <no-localization><b>The Pollination Project</b></no-localization> to offer seed funding to individuals and burgeoning organizations. Here's what 2022 looked like for the program:",
                    },
                    {
                      b: (chunks) => <b>{chunks}</b>,
                    },
                  )}
                </div>
                <div className='text-xl text-left p-5 bg-grey-lighter'>
                  {intl.formatMessage(
                    {
                      id: 'page.year-in-review.2022.section.grant-program.paragraph.1',
                      defaultMessage:
                        'Additionally, our endorsement of individuals and organizations helped secure <b>$70,000 in recommended funding</b> through other programs to those recipients.',
                    },
                    {
                      b: (chunks) => <b>{chunks}</b>,
                    },
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 bg-yellow pr-5'>
            <div className='flex justify-center h-full flex-col gap-10 pl-5 xl:pl-20 py-20'>
              <div className='flex flex-row sm:gap-10'>
                <div className='flex justify-center items-center collapse sm:visible md:collapse lg:visible w-0 sm:w-[115px] md:w-0 lg:w-[115px] h-[115px] bg-yellow-dark'>
                  <CustomImage alt='grant applicants' src={GrantApplicants} />
                </div>
                <div className='flex flex-col justify-evenly font-mono text-left'>
                  <span className='block text-8xl font-bold leading-[0.7]'>
                    <AnimatedNumber number={97} />
                  </span>
                  <span className='text-3xl leading-[1.25rem]'>
                    {intl.formatMessage({
                      id: 'page.year-in-review.2022.section.grant-program.stats.applicants',
                      defaultMessage: 'Applicants',
                    })}
                  </span>
                </div>
              </div>
              <div className='flex flex-row sm:gap-10'>
                <div className='flex justify-center items-center collapse sm:visible md:collapse lg:visible w-0 sm:w-[115px] md:w-0 lg:w-[115px] h-[115px] bg-yellow-dark'>
                  <CustomImage alt='grant granted' src={GrantGranted} />
                </div>
                <div className='flex flex-col justify-evenly font-mono text-left'>
                  <span className='block text-8xl font-bold leading-[0.7]'>
                    <AnimatedNumber prefix='$' number={54386} />
                  </span>
                  <span className='text-3xl leading-[1.25rem]'>
                    {intl.formatMessage({
                      id: 'page.year-in-review.2022.section.grant-program.stats.granted',
                      defaultMessage: 'Granted',
                    })}
                  </span>
                </div>
              </div>
              <div className='flex flex-row sm:gap-10'>
                <div className='flex justify-center items-center collapse sm:visible md:collapse lg:visible w-0 sm:w-[115px] md:w-0 lg:w-[115px] h-[115px] bg-yellow-dark'>
                  <CustomImage alt='grant funded' src={GrantFunded} />
                </div>
                <div className='flex flex-col justify-evenly font-mono text-left'>
                  <span className='block text-8xl font-bold leading-[0.7]'>
                    <AnimatedNumber number={36} />
                  </span>
                  <span className='text-3xl leading-[1.25rem]'>
                    {intl.formatMessage({
                      id: 'page.year-in-review.2022.section.grant-program.stats.funded',
                      defaultMessage: 'Funded',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GrantProgram;
