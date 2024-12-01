import { FormattedMessage, useIntl } from 'react-intl';

import { LightButton } from '../../../decoration/buttons';
import SectionContainer from '../sectionContainer';
import SquareField from '../../../decoration/squares';
import { pixelPig } from '../../../../images/separators';

import CustomImage from 'components/decoration/customImage';

const MovingForward: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <SquareField
        className='hidden md:block'
        squares={[
          { color: 'grey-light', left: 0, bottom: 0 },
          { color: 'grey-light', right: 0, top: 0 },
        ]}
      />
      <SectionContainer color='grey-darker' className='text-white'>
        <div className='text-center md:w-1/2 mx-auto space-y-5'>
          <div>
            <div className='w-24 mx-auto'>
              <CustomImage src={pixelPig} alt='' />
            </div>

            <h2 className='font-bold text-4xl pt-5'>
              <FormattedMessage
                id='page.year-in-review.2021.section.moving-forward.heading'
                defaultMessage='Moving forward'
              />
            </h2>
          </div>

          <FormattedMessage
            id='page.year-in-review.2021.section.moving-forward.paragraph'
            defaultMessage="<p>What a year! We wanted to focus on data-based efforts while staying true to our spirit of experimental projects, and we were able to achieve those goals through <no-localization>Activist Hub</no-localization> and <no-localization>Vegan Linguists</no-localization>. This has truly been the best year for creating connections and partnerships in the animal protection movement, and we are extremely pleased with the work we've accomplished.</p> <p>This year, we have also prioritized organizing and optimizing internal processes. This was crucial for us since a core focus of 2022 is to expand our volunteer network to meet the demand of our services. We want to continue being able to serve the multifaceted needs of the vegan movement and empower people to become activists.</p> <p>We're really excited to hear your thoughts in our 2021 year in review, and if you like what we do, please consider supporting us by clicking the button below. Your donation ensures that all of our work and projects remain free and accessible to everyone, and we can't begin to thank you enough for the support!</p>"
            values={{
              p: (chunks) => <p>{chunks}</p>,
            }}
          />
          <div className='w-min mx-auto pt-10 pb-10'>
            <LightButton
              href={`/${intl.locale}/support`}
              className='w-min px-5'
            >
              <FormattedMessage
                id='page.year-in-review.2021.section.moving-forward.btn.cta'
                defaultMessage='Support our work'
              />
            </LightButton>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default MovingForward;
