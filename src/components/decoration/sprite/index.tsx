'use client';

import { useSpring, animated } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import useWindowSize from '../../../hooks/useWindowSize';
import useWindowBreakpoint from '../../../hooks/useWindowBreakpoint';

import FloatingHeart from './FloatingHeart';
import cssAnimations from './animations.module.css';

import CustomImage from 'components/decoration/customImage';

import type { StaticImageData } from 'next/image';

import chicken from '~images/animated/sprite_chicken.gif';
import pig from '~images/animated/sprite_pig.gif';
import sheep from '~images/animated/sprite_sheep.gif';
import cow from '~images/animated/sprite_cow.gif';
import goat from '~images/animated/sprite_goat.gif';
import duck from '~images/animated/sprite_duck.gif';
import chicks from '~images/animated/sprite_chicks.gif';
import fishg from '~images/animated/sprite_fish_green.gif';
import fishb from '~images/animated/sprite_fish_blue.gif';
import rooster from '~images/animated/sprite_rooster.gif';

interface SpriteProps {
  image: StaticImageData;
  secondsToTraverse?: number;
  pixelsLeft?: number;
  pixelsRight?: number;
}

const pixelSize = 64;
const scale = 0.5;

const Sprite = ({
  image,
  secondsToTraverse = 40,
  pixelsLeft = 3,
  pixelsRight = 1,
}: SpriteProps) => {
  const [reverse, setReverse] = useState(false);
  const [jumping, setJumping] = useState(false);

  const mdSize = useWindowBreakpoint('md');

  const { width = mdSize + 1 } = useWindowSize();

  const isMdScreen = width <= mdSize;

  const initialPositionPx = isMdScreen ? 0 : pixelsLeft * pixelSize;
  const finalPositionPx = isMdScreen
    ? width - image.width * scale - 20
    : width - pixelsRight * pixelSize - 20 - image.width * scale;
  const initialPosition = `${initialPositionPx}px`;
  const finalPosition = `${finalPositionPx}px`;

  // When the screen size changes, reset the animation position to avoid it overflowing
  const [reset, setReset] = useState(false);
  useEffect(() => {
    setReset(true);
    setReverse(false);
  }, [width]);
  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  const spring = useSpring({
    reset,
    from: {
      left: initialPosition,
    },
    to: {
      left: finalPosition,
    },
    reverse,
    onRest: () => {
      setReverse(!reverse);
    },
    config: {
      duration: secondsToTraverse * 1000 * (width / 1920),
    },
  });

  return (
    <>
      <animated.div
        className='absolute z-20 cursor-pointer select-none'
        style={{
          ...spring,
          height: image.height * scale,
          translateY: -image.height * scale,
          rotateY: reverse ? undefined : 180,
        }}
        onClick={() => {
          setJumping(true);
        }}
      >
        <div
          className={classNames('relative', {
            [cssAnimations.sprite]: jumping,
          })}
          onAnimationEnd={() => {
            setJumping(false);
          }}
        >
          <CustomImage
            src={image}
            height={image.height * scale}
            width={image.width * scale}
            alt=''
          />
        </div>
      </animated.div>
      <FloatingHeart position={spring.left} size='md' float={jumping} />
      <FloatingHeart
        position={spring.left}
        size='lg'
        float={jumping}
        delay={300}
      />
      <FloatingHeart
        position={spring.left}
        size='md'
        float={jumping}
        delay={600}
      />
    </>
  );
};

export { cow, chicken, sheep, pig, chicks, goat, duck, fishg, fishb, rooster };

export default Sprite;
