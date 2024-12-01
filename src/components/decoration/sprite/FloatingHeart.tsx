import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import cssAnimations from './animations.module.css';

import CustomImage from 'components/decoration/customImage';

import type { SpringValue } from '@react-spring/web';

import smHeart from '~images/VH_Pixel_Heart_Small.png';
import mdHeart from '~images/VH_Pixel_Heart_Medium.png';
import lgHeart from '~images/VH_Pixel_Heart_Large.png';

interface FloatingHeartProps {
  float?: boolean;
  size: 'sm' | 'md' | 'lg';
  delay?: number;
  position: SpringValue<string>;
}

const FloatingHeart: React.FC<FloatingHeartProps> = ({
  float,
  size,
  delay = 0,
  position,
}) => {
  const heartImgs = {
    sm: smHeart,
    md: mdHeart,
    lg: lgHeart,
  };
  const heartImg = heartImgs[size];
  const [floating, setFloating] = useState(false);
  const [left, setLeft] = useState(0.0);

  useEffect(() => {
    if (float && !floating) {
      setFloating(true);
      setTimeout(() => {
        setLeft(parseFloat(position.get()));
      }, delay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [float, delay, position]);

  return (
    <div
      className={classNames(
        'absolute z-20 select-none',
        floating ? '' : 'hidden',
      )}
      style={{ left: left }}
    >
      <div
        className={classNames('relative', floating ? cssAnimations.heart : '')}
        style={{ animationDelay: `${delay}ms` }}
        onAnimationEnd={() => {
          setFloating(false);
        }}
      >
        <CustomImage
          src={heartImg.src}
          height={heartImg.height / 3}
          width={heartImg.width / 3}
          alt=''
        />
      </div>
    </div>
  );
};

export default FloatingHeart;
