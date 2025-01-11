'use client';

import { useSpring, animated } from '@react-spring/web';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { Waypoint } from 'react-waypoint';

import useReduceMotion from '../../hooks/useReduceMotion';

const sizeRegex = /([a-z]{1,3}:)?text-[0-9][^\s]+/g;

const AnimatedNumber: React.FC<{
  number: number;
  approx?: boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
}> = ({ number, className = '', approx = false, prefix, suffix }) => {
  const [onView, setOnView] = useState<boolean>(false);

  const prefersReducedMotion = useReduceMotion();

  const { number: interpolatedNumber } = useSpring({
    from: { number: 0 },
    to: { number },
    config: { duration: prefersReducedMotion ? 0 : 500 },
    cancel: !onView,
  });

  const [sizeClasses, classesWithoutSize] = useMemo(() => {
    const sizeClasses = Array.from(className.matchAll(sizeRegex)).map(
      ([result]) => result,
    );

    const classesWithoutSize = className.replace(sizeRegex, '');
    return [sizeClasses, classesWithoutSize];
  }, [className]);

  const classes = classNames(
    'font-bold font-mono',
    classesWithoutSize,
    sizeClasses.length ? sizeClasses : 'text-7xl md:text-8xl',
  );

  return (
    <>
      <Waypoint
        onEnter={() => {
          setOnView(true);
        }}
      />
      <span className={classes} aria-label={`${number}`}>
        {prefix}
        <animated.span>
          {interpolatedNumber.to((x) =>
            Math.floor(x)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          )}
        </animated.span>
        {suffix}
        {approx && <>~</>}
      </span>
    </>
  );
};

export default AnimatedNumber;
