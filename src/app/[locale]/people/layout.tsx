import React from 'react';

import { NavButton } from 'components/decoration/buttons';
import Hero from 'components/decoration/hero';
import SquareField from 'components/decoration/squares';
import Sprite, { duck } from 'components/decoration/sprite';
import JoinTheTeam from 'components/layout/joinTheTeam';
import getServerIntl from 'app/intl';

import type { PropsWithChildren } from 'react';

import heroTagline from '~images/people/VH-team-hero-text.png';
import heroBackground from '~images/people/VH-cow-hero-nocircles.jpg';

enum Site {
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

const PeopleButtons: React.FC<{ locale: string }> = ({ locale }) => {
  const intl = getServerIntl(locale);

  return (
    <div className='flex flex-wrap justify-center mt-10 mb-5'>
      <NavButton href={`/${locale}/people/team`}>
        {intl.formatMessage({
          id: 'page.people.section.navigation.button.label.team',
          defaultMessage: 'OUR TEAM',
        })}
      </NavButton>
      <NavButton href={`/${locale}/people/volunteers`}>
        {intl.formatMessage({
          id: 'page.people.section.navigation.button.label.volunteers',
          defaultMessage: 'OUR VOLUNTEERS',
        })}
      </NavButton>
      <NavButton href={`/${locale}/people/advisors`}>
        {intl.formatMessage({
          id: 'page.people.section.navigation.button.label.advisors',
          defaultMessage: 'OUR ADVISORS',
        })}
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

const PeopleHero: React.FC<{ locale: string }> = ({ locale }) => {
  const intl = getServerIntl(locale);

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

const PeopleLayout = ({
  children,
  params: { locale },
}: PropsWithChildren<{ params: { locale: string } }>) => {
  return (
    <>
      <PeopleHero locale={locale} />
      <PeopleButtons locale={locale} />
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
      <JoinTheTeam locale={locale} />
    </>
  );
};

export default PeopleLayout;
