'use client';

import React from 'react';
import { useIntl } from 'react-intl';

import { LightButton } from '../decoration/buttons';

import CustomImage from 'components/decoration/customImage';

import teamIcons from '~images/VH-team-icons.png';

interface Props {}

const JoinTheTeam: React.FC<Props> = ({}) => {
  const intl = useIntl();

  return (
    <div className='bg-black px-5'>
      <div className='content-center mx-auto md:w-1/2 text-2xl pb-12'>
        <p className='mb-12 text-grey-dark pt-16'>
          <span className='text-5xl font-mono text-white'>
            {intl.formatMessage({
              id: 'section.join-the-team.headline',
              defaultMessage: 'JOIN OUR TEAM',
            })}
          </span>
        </p>
        <CustomImage src={teamIcons} alt='Compassion, Creativity, Code' />
        <p className='pb-5 mt-4 text-white'>
          {intl.formatMessage({
            id: 'section.join-the-team.paragraph',
            defaultMessage:
              'Are you a developer, designer, writer, or a creative professional interested in applying your digital skills for the animals? Learn more about our team members and view our openings below.',
          })}
        </p>
        <div className='flex justify-center flex-wrap'>
          <LightButton
            href={`/${intl.locale}/people/team`}
            className='m-5 font-mono font-semibold'
          >
            {intl.formatMessage({
              id: 'section.join-the-team.cta.meet-the-team',
              defaultMessage: 'Meet the Team',
            })}
          </LightButton>
          <LightButton
            href={`/${intl.locale}/join`}
            className='m-5 font-mono font-semibold'
          >
            {intl.formatMessage({
              id: 'section.join-the-team.cta.join',
              defaultMessage: 'Apply to Join',
            })}
          </LightButton>
        </div>
      </div>
    </div>
  );
};

export default JoinTheTeam;
