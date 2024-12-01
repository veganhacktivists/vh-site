import { FormattedMessage, useIntl } from 'react-intl';

import logo from '../../../../../public/images/yearInReview/2023/playground-logo.png';
import screenshot from '../../../../../public/images/yearInReview/2023/playground-screenshot.jpg';

import SquareField from 'components/decoration/squares';
import { LightButton } from 'components/decoration/buttons';
import { SectionHeader } from 'components/decoration/textBlocks';
import CustomImage from 'components/decoration/customImage';

const TOP_DECORATION_SQUARES = [
  { color: 'grey-lighter', size: 16, left: 0, bottom: 0 },
  { color: 'white', size: 16, left: 0, top: 0 },
  { color: 'white', size: 16, right: 0, top: 0 },
];

const Playground: React.FC = () => {
  const intl = useIntl();

  const buttonLabel = intl.formatMessage({
    id: 'page.year-in-review.2023.section.playground.label',
    defaultMessage: 'Watch it here',
  });
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <div className='flex flex-col md:flex-row text-left bg-grey-darker text-white'>
        <div className='basis-full md:basis-1/2 flex justify-center md:justify-end pt-16 md:pt-24 px-5 md:px-10'>
          <div className='flex-grow max-w-xl flex items-center justify-center'>
            <CustomImage alt='Playground screenshot' src={screenshot} />
          </div>
        </div>
        <div className='basis-full md:basis-1/2 flex justify-center md:justify-start pt-10 pb-16 md:py-24 px-5 md:px-10'>
          <div className='flex-grow max-w-xl flex justify-center'>
            <div>
              <div className='pb-10'>
                <CustomImage alt='Playground logo' src={logo} />
              </div>
              <SectionHeader
                header={intl.formatMessage({
                  id: 'page.year-in-review.2023.section.playground.heading',
                  defaultMessage: '<b>FROM STRENGTH TO STRENGTH</b>',
                })}
                stackEntries
              />
              <div className='text-lg pt-8 pb-4'>
                <FormattedMessage
                  id='page.year-in-review.2023.section.playground.content'
                  defaultMessage="After the immense success of <no-localization>Playground</no-localization> since its launch in 2021, we continued to strive for ways to improve it. The platform, comprising over 2,500 vegan volunteers who have collectively contributed over thousands of hours of work for the movement, has established itself as the go-to place to connect with organizations.<no-localization>{break}{break}</no-localization>We witnessed the growth of <no-localization>Playground’s</no-localization> community by nearly 1,000 new volunteers, handling 93 diverse requests like data analysis and marketing in this year alone.<no-localization>{break}{break}</no-localization>In 2023, we decided to take <no-localization>Playground</no-localization> to the next level. We learned a lot and started working on implementing changes to enhance user experience. By providing more control for those seeking support, and a much more enjoyable (and even fun!) process for fulfilling requests, <no-localization>Playground's</no-localization> upgrade is set to boost both experience and impact for animals.<no-localization>{break}{break}</no-localization><no-localization>Playground</no-localization> is separate from the <no-localization>Vegan Hacktivists</no-localization> team, and aims to increase the capacity in which we can support work for the animals. In preparation of <no-localization>Playground V2</no-localization>, we’ve released an introductory video about the current platform.<no-localization>{break}{break}</no-localization><b>Haven’t seen the video yet?</b>"
                  values={{
                    b: (chunks) => <b>{chunks}</b>,
                    break: <br />,
                  }}
                />
              </div>
              <div className='flex flex-row justify-between mt-4'>
                <LightButton
                  capitalize={false}
                  className='h-fit'
                  href='https://www.youtube.com/watch?v=yk5pwbtgmp4'
                  newTab
                >
                  {buttonLabel}
                </LightButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playground;
