import SentientLogo from './sentientLogo';

import { SectionHeader } from 'components/decoration/textBlocks';
import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';
import Sprite, { cow } from 'components/decoration/sprite';
import getServerIntl from 'app/intl';

import SGILogo from '~images/yearInReview/2023/stray-dog-institute.png';
import ACCLogo from '~images/yearInReview/2023/animal-advocacy-careers.png';

interface Props {
  locale: string;
}

const Collaborations: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  const TOP_DECORATION_SQUARES = [
    { color: 'pink-dark', size: 16, right: 0, bottom: 0 },
  ];

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <div className='py-16 md:py-24 px-5 md:px-10'>
        <div className='max-w-screen-lg mx-auto text-2xl pb-16 md:pb-24'>
          {intl.formatMessage(
            {
              id: 'page.year-in-review.2023.section.collaborations.header',
              defaultMessage:
                '2023 was marked by collaborations that focused on arguably one of the most important building blocks in the movement: <b>acquiring and cultivating talent and skill</b>.',
            },
            {
              b: (chunks) => <b>{chunks}</b>,
            },
          )}
        </div>

        <div className='max-w-screen-lg mx-auto flex flex-col gap-10'>
          <div className='flex flex-col lg:grid lg:grid-cols-3 gap-10'>
            <div className='text-lg text-left lg:col-span-2'>
              <div className='flex items-center mb-5'>
                <div className='bg-green flex items-center justify-center text-3xl md:text-7xl text-white font-bold font-mono w-10 md:w-20 h-10 md:h-20 p-3 mr-3 md:mr-10'>
                  1
                </div>
                <SectionHeader
                  header={intl.formatMessage({
                    id: 'page.year-in-review.2023.section.collaborations.1.heading',
                    defaultMessage:
                      'Collaboration for <b>EFFECTIVE REDIRECTION</b>',
                  })}
                  smallOnMobile={true}
                  stackEntries
                />
              </div>
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.collaborations.1.content',
                  defaultMessage:
                    "This year, we partnered with <no-localization>AAC</no-localization> by winding down their skilled volunteer board's activities and guiding those eager to volunteer or seeking volunteer positions towards <no-localization>VH Playground</no-localization>. Likewise, <no-localization>Playground</no-localization> began to advocate <no-localization>AAC's</no-localization> career opportunities within our volunteer community for individuals aspiring to pursue a more career-oriented role.",
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                  break: <br />,
                },
              )}
            </div>
            <div className='bg-[#F1F1F1] p-10 flex items-center justify-center max-w-xl mx-auto w-full'>
              <CustomImage alt='Animal Advocacy Careers' src={ACCLogo} />
            </div>
          </div>
          <div className='flex flex-col lg:grid lg:grid-cols-3 gap-10'>
            <div className='text-lg text-left lg:col-span-2'>
              <div className='flex items-center mb-5'>
                <div className='bg-yellow-orange flex items-center justify-center text-3xl md:text-7xl text-white font-bold font-mono w-10 md:w-20 h-10 md:h-20 p-3 mr-3 md:mr-10'>
                  2
                </div>
                <SectionHeader
                  header={intl.formatMessage({
                    id: 'page.year-in-review.2023.section.collaborations.2.heading',
                    defaultMessage:
                      'Partnership for <b>ADVANCED CONVERSATIONS</b>',
                  })}
                  smallOnMobile={true}
                  stackEntries
                />
              </div>
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.collaborations.2.content',
                  defaultMessage:
                    'We partnered with <no-localization>Sentient Media’s Writers’ Collective</no-localization> to train and mentor new writers focused on topics like animal welfare, plant-based diets, social justice, and the environment. By guiding almost 200+ writer applicants to their program, we support enriching these important conversations.',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                  break: <br />,
                },
              )}
            </div>
            <div className='bg-[#F1F1F1] p-10 flex items-center justify-center max-w-xl mx-auto w-full'>
              <SentientLogo />
            </div>
          </div>
          <div className='flex flex-col lg:grid lg:grid-cols-3 gap-10'>
            <div className='text-lg text-left lg:col-span-2'>
              <div className='flex items-center mb-5'>
                <div className='bg-orange flex items-center justify-center text-3xl md:text-7xl text-white font-bold font-mono w-10 md:w-20 h-10 md:h-20 p-3 mr-3 md:mr-10'>
                  3
                </div>
                <SectionHeader
                  header={intl.formatMessage({
                    id: 'page.year-in-review.2023.section.collaborations.3.heading',
                    defaultMessage: 'Advancing <b>ANIMAL ADVOCACY WITH AI</b>',
                  })}
                  smallOnMobile={true}
                  stackEntries
                />
              </div>
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.collaborations.3.content',
                  defaultMessage:
                    'Together with <no-localization>Stray Dog Institute</no-localization>, we hosted two webinars on AI, covering ground on topics such as accelerating change through AI, its role in scaling, optimizing campaigns, and supplementing our advocacy as a whole. As capacity builders, we prioritize equipping advocates with the resources needed to boost their efficiency and impact. AI undoubtedly serves as a tool for this very purpose.',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                  break: <br />,
                },
              )}
            </div>
            <div className='bg-[#F1F1F1] p-10 flex items-center justify-center max-w-xl mx-auto w-full'>
              <CustomImage alt='Stray Dog Institute' src={SGILogo} />
            </div>
          </div>
        </div>
      </div>
      <Sprite image={cow} />
    </>
  );
};

export default Collaborations;
