import React from 'react';

import SectionContainer from '../sectionContainer';
import { SectionHeader } from '../../../decoration/textBlocks';

import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';
import { DarkButton } from 'components/decoration/buttons';
import getServerIntl from 'app/intl';

import WildAnimalSuffering from '~images/yearInReview/2022/wild-animal-suffering.png';
import PitchFTA from '~images/yearInReview/2022/pitch-fta.png';

interface Props {
  locale: string;
}

const BonusProjects: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        squares={[
          { right: 0, bottom: 0, color: 'grey-background', size: 16 },
          { left: 0, bottom: 0, color: 'grey-background', size: 16 },
          { right: 0, top: 0, color: 'grey-light', size: 16 },
        ]}
      />
      <SectionContainer
        color='grey-background'
        header={
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.year-in-review.2022.section.bonus-projects.headline',
              defaultMessage: 'Bonus <b>projects</b>',
            })}
          />
        }
      >
        <div className='pb-20'>
          <div className='xl:w-1/2 mx-auto'>
            <span className='text-xl'>
              {intl.formatMessage({
                id: 'page.year-in-review.2022.section.bonus-projects.paragraph',
                defaultMessage:
                  'The team gathered together to build two mini projects before the end of the year that we thought would provide value to other movements and help promote our work.',
              })}
            </span>
          </div>
          <div className='xl:w-2/3 mx-auto mt-10'>
            <div className='flex flex-col md:flex-row gap-10 lg:gap-20 pb-20'>
              <div>
                <div className='flex md:w-[420px] md:h-[420px] max-w-[420px] max-h-[420px] mx-auto md:mx-0'>
                  <CustomImage src={PitchFTA} alt='PitchFTA' />
                </div>
              </div>
              <div className='text-center md:text-left'>
                <span className='text-4xl mb-2 block font-bold'>
                  {intl.formatMessage({
                    id: 'page.year-in-review.2022.section.bonus-projects.pitchfta.heading',
                    defaultMessage:
                      '<no-localization>PitchFTA.org</no-localization>',
                  })}
                </span>
                <span className='text-xl block mb-5'>
                  {intl.formatMessage({
                    id: 'page.year-in-review.2022.section.bonus-projects.pitchfta.paragraph',
                    defaultMessage:
                      '<no-localization>Pitch for the Animals</no-localization> is a mobile-friendly app that crowdsources innovative ideas for the movement. The winning app idea, determined by popular vote at the inaugural <no-localization>AVA Summit</no-localization>, will be built by our team. Users participate in various in-app and in-person activities — such as quizzes, games, attending events, and participating in a scavenger hunt to find QR codes at the conference — to earn votes.',
                  })}
                </span>
                <span className='text-2xl block font-bold'>
                  {intl.formatMessage({
                    id: 'page.year-in-review.2022.section.bonus-projects.featured',
                    defaultMessage: 'Featured',
                  })}
                </span>
                <span className='text-xl block'>
                  {intl.formatMessage({
                    id: 'page.year-in-review.2022.section.bonus-projects.pitchfta.featured.0',
                    defaultMessage:
                      '2022 <no-localization>AVA Summit</no-localization>',
                  })}
                </span>
                <div className='flex'>
                  <DarkButton
                    href='https://pitchfta.org'
                    className='mt-5 mx-auto md:mx-0 !normal-case'
                  >
                    {intl.formatMessage({
                      id: 'page.year-in-review.2022.section.bonus-projects.pitchfta.btn.cta',
                      defaultMessage:
                        '<no-localization>PitchFTA.org</no-localization>',
                    })}
                  </DarkButton>
                </div>
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-10 lg:gap-20'>
              <div>
                <div className='flex md:w-[420px] max-w-[420px] max-h-[420px] md:h-[420px] mx-auto md:mx-0'>
                  <CustomImage
                    src={WildAnimalSuffering}
                    alt='WildAnimalSuffering'
                  />
                </div>
              </div>
              <div className='text-center md:text-left'>
                <span className='text-4xl mb-2 block font-bold break-all'>
                  {intl.formatMessage({
                    id: 'page.year-in-review.2022.section.bonus-projects.wild-animal-suffering.heading',
                    defaultMessage:
                      '<no-localization>WildAnimalSuffering.org</no-localization>',
                  })}
                </span>
                <span className='text-xl block mb-5'>
                  {intl.formatMessage({
                    id: 'page.year-in-review.2022.section.bonus-projects.wild-animal-suffering.paragraph',
                    defaultMessage:
                      'This educational website presents the many issues facing wild animals and how people can make a difference in an accessible, visually-stunning format. From custom illustrations to educational resources, this site brings value to the conversation of wild animals. Special thanks to our friends at <no-localization>Animal Ethics</no-localization>, <no-localization>Wild Animal Initiative</no-localization>, <no-localization>Rethink Priorities</no-localization>, for lending their expertise for this project.',
                  })}
                </span>
                <span className='text-2xl block font-bold'>
                  {intl.formatMessage({
                    id: 'page.year-in-review.2022.section.bonus-projects.featured',
                    defaultMessage: 'Featured',
                  })}
                </span>
                <span className='text-xl block'>
                  {intl.formatMessage({
                    id: 'page.year-in-review.2022.section.bonus-projects.wild-animal-suffering.featured.0',
                    defaultMessage:
                      '<no-localization>80,000 Hours</no-localization> Website',
                  })}
                </span>
                <span className='text-xl block'>
                  {intl.formatMessage({
                    id: 'page.year-in-review.2022.section.bonus-projects.wild-animal-suffering.featured.1',
                    defaultMessage:
                      '<no-localization>Effective Altruism</no-localization> Newsletter',
                  })}
                </span>
                <span className='text-xl block'>
                  {intl.formatMessage({
                    id: 'page.year-in-review.2022.section.bonus-projects.wild-animal-suffering.featured.2',
                    defaultMessage:
                      '<no-localization>Animal Charity Evaluators</no-localization> Newsletter',
                  })}
                </span>
                <div className='flex'>
                  <DarkButton
                    href='https://wildanimalsuffering.org'
                    className='mt-5 mx-auto md:mx-0 !normal-case'
                  >
                    {intl.formatMessage({
                      id: 'page.year-in-review.2022.section.bonus-projects.wild-animal-suffering.btn.cta',
                      defaultMessage:
                        '<no-localization>WildAnimalSuffering.org</no-localization>',
                    })}
                  </DarkButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default BonusProjects;
