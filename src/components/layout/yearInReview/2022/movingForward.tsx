import { FormattedMessage, useIntl } from 'react-intl';

import SectionContainer from '../sectionContainer';
import SquareField from '../../../decoration/squares';
import { pixelPig } from '../../../../images/separators';
import Sprite, { goat } from '../../../decoration/sprite';

import CustomImage from 'components/decoration/customImage';
import { DarkButton } from 'components/decoration/buttons';

const MovingForward: React.FC = () => {
  const intl = useIntl();
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
      <SectionContainer color='grey-background'>
        <div className='text-center text-xl md:w-3/4 pb-10 mx-auto space-y-5'>
          <div>
            <div className='w-24 mx-auto mb-6'>
              <CustomImage src={pixelPig} alt='' />
            </div>
            <h2 className='text-6xl font-bold font-mono uppercase'>
              <FormattedMessage
                id='page.year-in-review.2022.section.moving-forward.heading'
                defaultMessage='Forward & Onward'
              />
            </h2>
          </div>
          <p>
            <FormattedMessage
              id='page.year-in-review.2022.section.moving-forward.paragraph'
              defaultMessage='We witnessed our biggest transformation to date this year. We focused significantly on the internal workings and processes of our organization, while also doing our best to serve organizations and advocates. We launched technology using machine learning and artificial intelligence, and we delivered new features and upgrades to high-impact projects. We attended conferences, spoke on podcasts, and created meaningful connections to expand our reach and impact. We launched the first study of its kind to collect data on the state of tech in the movement, and we partnered with 10 unique organizations in the animal protection movement on various initiatives. There is so much that we’ve done behind the scenes, and there is so much more to come. We are excited to be on this journey with all of you.'
            />
          </p>
          <div className='w-min mx-auto pt-10 pb-10'>
            <DarkButton href={`/${intl.locale}/support`} className='w-min px-5'>
              <FormattedMessage
                id='page.year-in-review.2022.section.moving-forward.btn.cta'
                defaultMessage='Support our work'
              />
            </DarkButton>
          </div>
        </div>
      </SectionContainer>
      <div className='relative'>
        <Sprite image={goat} pixelsLeft={1} pixelsRight={1} />
      </div>
    </>
  );
};

export default MovingForward;
