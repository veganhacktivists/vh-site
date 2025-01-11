import SquareField from 'components/decoration/squares';
import getServerIntl from 'app/intl';

const TOP_DECORATION_SQUARES = [
  {
    top: 0,
    left: 0,
    color: '#d31679',
    size: 16,
  },
  {
    top: 0,
    right: 0,
    color: '#171919',
    size: 16,
  },
];

const BOTTOM_DECORATION_SQUARES = [
  {
    bottom: 0,
    right: 0,
    color: '#d31679',
    size: 16,
  },
];

interface HoursVolunteeredProps {
  locale: string;
}

const HoursVolunteered: React.FC<HoursVolunteeredProps> = ({
  locale,
}: HoursVolunteeredProps) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='relative w-full overflow-hidden text-2xl bg-white'>
        <div>
          <div className='bg-magenta flex flex-col lg:flex-row justify-center md:first-letter:flex-wrap p-12 px-2'>
            {intl.formatMessage(
              {
                id: 'page.our-work.section.hours-volunteered-banner.content',
                defaultMessage:
                  '<hours>Hours</hours> <right>volunteered in 2022 for the animal protection movement</right>',
              },
              {
                hours: (chunk) => (
                  <div className='flex items-center flex-wrap  text-white text-8xl font-mono px-2 justify-center'>
                    <span className='font-bold'>9600+</span>{' '}
                    <span className='uppercase font-light'>{chunk}</span>
                  </div>
                ),
                right: (chunk) => (
                  <div className='flex items-center flex-wrap max-w-lg mx-auto lg:mx-0 lg:max-w-[27rem] text-white text-3xl font-serif italic font-bold text-center lg:text-left px-2 justify-center'>
                    {chunk}
                  </div>
                ),
              },
            )}
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

export default HoursVolunteered;
