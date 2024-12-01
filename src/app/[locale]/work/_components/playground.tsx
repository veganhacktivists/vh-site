import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';
import { LightButton } from 'components/decoration/buttons';
import getServerIntl from 'app/intl';
import PlaygroundStats from 'components/layout/playground/playgroundStats';

import playgroundLogo from '~images/playground/VH_Playground_Logo_Full.png';

const TOP_DECORATION_SQUARES = [
  { color: '#454545', size: 16, left: 0, top: 0 },
  { color: '#fff', size: 16, right: 0, top: 0 },
];

const BOTTOM_DECORATION_SQUARES = [
  {
    left: 0,
    bottom: 0,
    color: 'white',
    size: 16,
  },
  {
    right: 0,
    bottom: 0,
    color: '#454545',
    size: 16,
  },
];

interface PlaygroundProps {
  locale: string;
}

const Playground: React.FC<PlaygroundProps> = ({ locale }: PlaygroundProps) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='bg-grey-dark text-white py-32 px-5'>
        <div className='w-3/4 md:w-1/2 mx-auto space-y-8'>
          <div className='mx-auto w-3/4'>
            <CustomImage src={playgroundLogo} alt='VH Playground' />
          </div>
          <div className='text-lg space-y-3 mx-auto'>
            {intl.formatMessage(
              {
                id: 'page.our-work.section.playground.introduction',
                defaultMessage:
                  '<p><no-localization>Playground</no-localization> was our response to meet the overwhelming demand of tech and design support in our movement, while staying sustainable as an organization with limited capacity. We prioritized automating the process of connecting organizations with technical, design, and other support needs with skilled volunteers.</p> <p>Beyond design and software development, these volunteers are professionals with a wide array of skills and backgrounds in data science, videography, marketing, security, research, and much more.</p>',
              },
              {
                p: (chunk) => <p>{chunk}</p>,
              },
            )}
          </div>
          <div className='flex flex-col md:flex-row mx-auto justify-center gap-5 py-6'>
            <PlaygroundStats skipOpenRequests />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 md:w-fit mx-auto gap-9 pt-4'>
            <LightButton
              href={`/${locale}/playground`}
              className='mx-auto w-full md:w-fit'
            >
              <span className='px-4'>
                {intl.formatMessage({
                  id: 'page.our-work.section.playground.playground.cta-button.label',
                  defaultMessage: 'Volunteer',
                })}
              </span>
            </LightButton>
            <LightButton
              href={`/${locale}/playground/submit`}
              className='mx-auto w-full md:w-fit'
            >
              <span className='px-4'>
                {intl.formatMessage({
                  id: 'page.our-work.section.playground.create-request.cta-button.label',
                  defaultMessage: 'Get Support',
                })}
              </span>
            </LightButton>
          </div>
        </div>
      </div>

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className='hidden md:block'
      />
    </>
  );
};

export default Playground;
