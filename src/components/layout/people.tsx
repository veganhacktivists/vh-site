import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { NavButton } from '../decoration/buttons';
import Hero from '../decoration/hero';
import SquareField from '../decoration/squares';
import heroBackground from '../../../public/images/people/VH-cow-hero-nocircles.jpg';
import heroTagline from '../../../public/images/people/VH-team-hero-text.png';
import Sprite, { duck } from '../decoration/sprite';

import JoinTheTeam from './joinTheTeam_pages';

import type { Layout } from '../../types/persistentLayout';

export enum Site {
  Patreon = 'patreon',
  Reddit = 'reddit',
  Twitter = 'twitter',
  Instagram = 'instagram',
  Github = 'github',
  LinkedIn = 'linkedin',
  Website = 'website',
  Mail = 'mail',
  Facebook = 'facebook',
}

export interface SocialLink {
  site: Site;
  link: string;
}

const PeopleButtons: React.FC = () => {
  const locale = useIntl().locale;

  return (
    <div className='flex flex-wrap justify-center mt-10 mb-5'>
      <NavButton href={`/${locale}/people/team`}>
        <FormattedMessage
          id='page.people.section.navigation.button.label.team'
          defaultMessage='OUR TEAM'
        />
      </NavButton>
      <NavButton href={`/${locale}/people/volunteers`}>
        <FormattedMessage
          id='page.people.section.navigation.button.label.volunteers'
          defaultMessage='OUR VOLUNTEERS'
        />
      </NavButton>
      <NavButton href={`/${locale}/people/advisors`}>
        <FormattedMessage
          id='page.people.section.navigation.button.label.advisors'
          defaultMessage='OUR ADVISORS'
        />
      </NavButton>
    </div>
  );
};

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'green', size: 24, left: 16, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },
  { color: 'orange', size: 16, right: 32, bottom: 16 },
  { color: 'red', size: 32, right: 0, top: -16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const PeopleHero: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <Hero
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: intl.formatMessage({
            id: 'page.people.hero.alt-text',
            defaultMessage: 'Our Community of Passionate Activists',
          }),
        }}
        alignment='left'
        classNameMapping={{
          container: 'bg-center',
          backgroundImage: 'object-[75%_0] md:object-center',
        }}
      />
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className='hidden md:block'
      />
    </>
  );
};

const PeopleLayout: Layout = ({ children }) => {
  return (
    <>
      <PeopleHero />
      <PeopleButtons />
      {children}
      <Sprite image={duck} pixelsLeft={1} pixelsRight={1} />
      <SquareField
        squares={[
          { color: 'white', size: 16, left: 0, bottom: 0 },
          { color: 'grey-lighter', size: 16, left: 0, top: 0 },
          { color: 'grey-darker', size: 16, right: 0, bottom: 0 },
          { color: 'grey', size: 16, right: 16, top: 0 },
        ]}
        className='hidden md:block'
      />
      <JoinTheTeam />
    </>
  );
};

export default PeopleLayout;
