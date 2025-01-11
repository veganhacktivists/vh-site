import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { LightButton } from '../decoration/buttons';
import teamIcons from '../../../public/images/VH-team-icons.png';

import CustomImage from 'components/decoration/customImage';

const MeetOurTeam: React.FC = () => {
  const locale = useIntl().locale;

  return (
    <div className='bg-black'>
      <div className='content-center mx-auto md:w-1/2 text-2xl pb-12'>
        <p className='mb-12 text-grey-dark pt-16'>
          <span className='text-5xl font-mono uppercase text-white'>
            <FormattedMessage
              id='section.meet-the-team.headline'
              defaultMessage='Meet our team'
            />
          </span>
        </p>
        <CustomImage src={teamIcons} alt='Compassion, Creativity, Code' />
        <div className='flex justify-center flex-wrap'>
          <LightButton
            href={`/${locale}/people/team`}
            className='font-semibold m-5 font-mono'
          >
            <FormattedMessage
              id='section.meet-the-team.cta-button.label'
              defaultMessage='Learn more'
            />
          </LightButton>
        </div>
      </div>
    </div>
  );
};

export default MeetOurTeam;
