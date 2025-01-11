'use client';

import { Player } from '@lottiefiles/react-lottie-player';

import VSLogoLottieFile from '../../../../../public/lottiefiles/VS_logoAnim_Minimal.json';

const VioletStudiosLogo = () => {
  return (
    <Player
      autoplay
      loop
      src={VSLogoLottieFile}
      className='w-3/5 md:w-[290px]'
    />
  );
};

export default VioletStudiosLogo;
