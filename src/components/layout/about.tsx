import React from 'react';
import { useIntl } from 'react-intl';

import { NavButton } from '../decoration/buttons';
import Hero from '../decoration/hero';
import SquareField from '../decoration/squares';
import Sprite, { goat } from '../decoration/sprite';

import GrantsCallToAction from './grants/grantsCallToAction_pages';

import type { Layout } from '../../types/persistentLayout';

import heroTagline from '~images/about/hero-tagline.png';
import heroBackground from '~images/VH-pigs-hero.jpg';

const AboutButtons: React.FC = () => {
  const intl = useIntl();
  return (
    <div className='flex flex-wrap justify-center mt-10 mb-5'>
      <NavButton href={`/${intl.locale}/about/our-mission`}>
        {intl.formatMessage({
          id: 'page.about.section.navigation.button.label.mission',
          defaultMessage: 'OUR MISSION',
        })}
      </NavButton>
      <NavButton href={`/${intl.locale}/about/our-story`}>
        {intl.formatMessage({
          id: 'page.about.section.navigation.button.label.story',
          defaultMessage: 'OUR STORY',
        })}
      </NavButton>
      <NavButton href={`/${intl.locale}/about/our-values`}>
        {intl.formatMessage({
          id: 'page.about.section.navigation.button.label.values',
          defaultMessage: 'OUR VALUES',
        })}
      </NavButton>
    </div>
  );
};

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'pink', size: 24, left: 16, bottom: 0 },
  { color: 'orange', size: 16, left: 0, top: 0 },
  { color: 'yellow-orange', size: 16, right: 32, bottom: 16 },
  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const AboutHero: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <Hero
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: intl.formatMessage({
            id: 'page.about.hero.alt-text',
            defaultMessage: 'Data-Driven Activism',
          }),
        }}
        alignment='left'
        classNameMapping={{
          container: 'bg-center',
          backgroundImage: 'object-[75%_0] md:object-center',
        }}
        backgroundImageProps={{ placeholder: 'empty' }}
      />
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className='hidden md:block'
      />
    </>
  );
};

const AboutLayout: Layout = ({ children }) => {
  return (
    <>
      <AboutHero />
      <AboutButtons />
      {children}
      <SquareField
        squares={[
          { color: 'white', size: 16, top: 0 },
          { color: 'grey-background', size: 16, bottom: 0, left: 16 },
          { color: 'grey-background', size: 16, bottom: 0, right: 0 },
          { color: 'grey-background', size: 16, bottom: 0, right: 16 },
          { color: 'white', size: 16, top: 0, right: 16 },
        ]}
        className='hidden md:block'
      />
      <GrantsCallToAction />
      <Sprite image={goat} pixelsLeft={1} pixelsRight={0} />
    </>
  );
};

export default AboutLayout;
