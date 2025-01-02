import SquareField from 'components/decoration/squares';
import { DarkButton } from 'components/decoration/buttons';
import CustomImage from 'components/decoration/customImage';
import getServerIntl from 'app/intl';

import TheoryOfChangeImg from '~images/yearInReview/2023/theory-of-change.jpg';

const TOP_DECORATION_SQUARES = [
  { color: 'grey-lighter', size: 16, right: 0, top: 0 },
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'white', size: 16, right: 0, bottom: 0 },
];

interface Props {
  locale: string;
}

const TheoryOfChange: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  const buttonLabel = intl.formatMessage({
    id: 'page.year-in-review.2023.section.theory-of-change.label',
    defaultMessage: 'Take a closer look',
  });

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <div className='bg-white py-16 md:py-24 max-w-6xl mx-auto'>
        <div className='flex flex-col justify-center items-center text-left px-5 md:px-10'>
          <CustomImage
            alt='Theory of Change graphic showing inputs, short-term actions, long-term actions, and their impacts. Download the accessible PDF below'
            src={TheoryOfChangeImg}
          />
          <div className='mt-10'>
            <DarkButton
              capitalize={false}
              className='md:max-w-72 h-fit'
              href='/resources/theory-of-change.pdf'
              newTab
            >
              {buttonLabel}
            </DarkButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default TheoryOfChange;
