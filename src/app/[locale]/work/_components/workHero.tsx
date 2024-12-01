'use client';

import SquareField from 'components/decoration/squares';
import Hero from 'components/decoration/hero';

import heroTagline from '~images/work/VH-Hero-tagline.png';
import heroBackground from '~images/work/VH-Hero-background.png';

const BOTTOM_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'green', size: 32, left: 16, bottom: 0 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
  { color: 'orange', size: 16, right: 32, bottom: 16 },
  {
    color: 'red',
    size: 32,
    right: 0,
    bottom: 0,
    className: 'scale-y-50 translate-y-8',
  },
];

const WorkHero: React.FC = () => {
  return (
    <>
      <Hero
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: 'WE ARE CAPACITY BUILDERS',
        }}
        alignment='left'
        classNameMapping={{
          tagline: 'md:scale-75',
          backgroundImage: 'object-[75%_0] md:object-center',
        }}
      />

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className='hidden md:block'
      />
    </>
  );
};

export default WorkHero;
