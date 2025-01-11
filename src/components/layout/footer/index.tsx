'use client';

import Circle from '../../decoration/circle';
import roundLogo from '../../../../public/images/VH_Logo_Crest_Tagline.png';
import SquareField from '../../decoration/squares';

import Social from './social';
import Links from './links';

import CustomImage from 'components/decoration/customImage';

const FOOTER_TOP_DECORATION_SQUARES = [
  { color: 'gray-dark', size: 16, left: 0, bottom: 0 },
];

const FOOTER_DECORATION_SQUARES = [
  { color: 'gray', size: 16, left: 0, top: 0 },
  { color: 'gray-darker', size: 16, left: 16, top: 0 },
  { color: 'gray', size: 16, right: 16, top: 0 },
];

const Logo: React.FC = () => (
  <div className='pt-10 md:pt-0'>
    <CustomImage
      src={roundLogo}
      alt='VH Round Logo'
      width={roundLogo.width * 0.4}
      height={roundLogo.height * 0.4}
    />
  </div>
);

const Footer: React.FC = () => {
  return (
    <>
      <SquareField
        squares={FOOTER_TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <footer className='bg-grey-dark text-white mt-auto w-full bottom-0 left-0 flex-col md:flex-row flex flex-wrap justify-evenly py-10 text-center items-center z-0 relative overflow-hidden'>
        <div className='absolute top-0 left-0 right-0'>
          <SquareField
            squares={FOOTER_DECORATION_SQUARES}
            className='hidden xl:block'
          />
        </div>
        <Links />
        <Social />
        <Logo />
        <div className='absolute -z-10 inset-0'>
          <Circle opacity={0.1} />
          <Circle xAlign='right' yAlign='bottom' opacity={0.1} />
        </div>
      </footer>
    </>
  );
};

export default Footer;
