import SquareField from '../../../decoration/squares';
import { pixelPig } from '../../../../images/separators';
import Sprite, { goat } from '../../../decoration/sprite';

import CustomImage from 'components/decoration/customImage';
import { DarkButton } from 'components/decoration/buttons';
import getServerIntl from 'app/intl';

interface Props {
  locale: string;
}

const MovingForward: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        className='hidden md:block'
        squares={[
          { color: 'white', left: 0, top: 0 },
          { color: 'white', right: 0, top: 0 },
          { color: 'grey-background', right: 0, bottom: 0 },
        ]}
      />
      <div className='bg-grey-border py-16 md:py-24 px-5 md:px-10'>
        <div className='text-center text-xl md:w-3/4 mx-auto space-y-5'>
          <div>
            <div className='w-24 mx-auto mb-6'>
              <CustomImage src={pixelPig} alt='' />
            </div>
            <h2 className='text-6xl font-bold font-mono uppercase'>
              {intl.formatMessage({
                id: 'page.year-in-review.2023.section.moving-forward.heading',
                defaultMessage: 'Forward & Onward',
              })}
            </h2>
          </div>
          <p className='max-w-screen-lg m-auto'>
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.moving-forward.content',
              defaultMessage:
                '2023 was a year of development and transformation for our organization. We enhanced our capacity-building services by embracing new leadership roles and preparing our design team to branch out into a sister organization. Our newly launched tools quickly stood out, earning recognition and proving their worth by streamlining funding processes and mobilizing major funders in the space. We kicked off exciting new projects and mapped out our priorities for the ones ahead. Our visibility grew through leading talks at conferences, appearances in documentary credits, and numerous collaboration requests. Looking forward, we aim to broaden the array of groups we support through capacity building, propel organizational growth, and continuously improve our built tools for greater impact. We are immensely grateful to all our supporters and are excited to see where 2024 takes us next.',
            })}
          </p>
          <div className='w-min mx-auto pt-5'>
            <DarkButton href='/support' className='w-min px-5'>
              {intl.formatMessage({
                id: 'page.year-in-review.2023.section.moving-forward.btn.cta',
                defaultMessage: 'Support our work',
              })}
            </DarkButton>
          </div>
        </div>
      </div>
      <div className='relative'>
        <Sprite image={goat} pixelsLeft={1} pixelsRight={1} />
      </div>
    </>
  );
};

export default MovingForward;
