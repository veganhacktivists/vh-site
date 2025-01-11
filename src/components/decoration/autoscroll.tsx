'use client';

import classNames from 'classnames';
import { useMemo } from 'react';

export interface AutoScrollProps {
  items: React.ReactNode[] | React.ReactNode[][];
}

interface AnimatedRowProps {
  items: React.ReactNode[];
  backwards?: boolean;
}

const AnimatedRow = ({ items, backwards }: AnimatedRowProps) => {
  return (
    <div className='overflow-hidden'>
      <div
        className={classNames(
          'flex flex-row w-fit gap-8 place-items-center',
          backwards
            ? 'animate-infinite-scroll-reverse'
            : 'animate-infinite-scroll',
        )}
      >
        {[...items, ...items].map((item, i) => (
          <li key={i} className='w-max max-w-[15rem] flex-shrink-0 last:mr-8'>
            <div className='grayscale hover:grayscale-0 transition-[filter] ease-out'>
              {item}
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export const Autoscroll = ({ items }: AutoScrollProps) => {
  const rows = useMemo(
    () => (Array.isArray(items[0]) ? items : [items]) as React.ReactNode[][],
    [items],
  );

  return (
    <ul className='space-y-12'>
      {rows.map((row, i) => (
        <AnimatedRow key={i} items={row} backwards={i % 2 === 0} />
      ))}
    </ul>
  );
};
