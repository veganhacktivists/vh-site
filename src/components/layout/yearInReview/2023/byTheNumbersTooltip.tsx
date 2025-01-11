'use client';

import React, { useRef, useState } from 'react';

import CustomLink from 'components/decoration/link';
import getThemeColor from 'lib/helpers/theme';

interface ToolTipProps {
  children: React.ReactNode;
  linkUrl: string;
  learnMoreLabel: string;
}

const ByTheNumbersTooltip = ({
  children,
  linkUrl,
  learnMoreLabel,
}: ToolTipProps) => {
  const isClicked = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  const clickToolTip = () => {
    // Only allow the click functionality on devices smaller than desktop
    if (window.innerWidth < 1024) isClicked.current = !isClicked.current;
  };

  const hoverToolTip = () => {
    if (isClicked.current !== true) toggleTooltip();
  };

  const toggleTooltip = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      className='lg:relative inline-block'
      onMouseEnter={() => hoverToolTip()}
      onMouseLeave={() => hoverToolTip()}
    >
      <button
        type='button'
        onClick={clickToolTip}
        className='text-gray-500 hover:text-gray-700 focus:outline-none lg:z-20 relative'
        aria-label='Help'
      >
        <svg
          width='20'
          height='19'
          viewBox='0 0 20 19'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='ml-3'
        >
          <path
            fill={isVisible ? 'black' : 'gray'}
            d='M8.625 4.71532H10.5417V6.60145H8.625V4.71532ZM8.625 8.48757H10.5417V14.146H8.625V8.48757ZM9.58333 0C4.29333 0 0 4.22493 0 9.43064C0 14.6363 4.29333 18.8613 9.58333 18.8613C14.8733 18.8613 19.1667 14.6363 19.1667 9.43064C19.1667 4.22493 14.8733 0 9.58333 0ZM9.58333 16.9751C5.35708 16.9751 1.91667 13.5895 1.91667 9.43064C1.91667 5.27173 5.35708 1.88613 9.58333 1.88613C13.8096 1.88613 17.25 5.27173 17.25 9.43064C17.25 13.5895 13.8096 16.9751 9.58333 16.9751Z'
          />
        </svg>
      </button>
      {isVisible && (
        <div className='z-10 w-full sm:w-auto absolute lg:pl-[40px] font-large left-1/2 bottom-full -translate-x-1/2 lg:translate-x-0 lg:top-3'>
          <div
            className='border-solid top-0 absolute left-[10px] hidden lg:inline translate-x-1'
            // Tailwind was misbehaving with the border color and widths so I am styling inline
            style={{
              borderWidth: '0 30px 30px 0',
              borderColor: `transparent ${getThemeColor(
                'gray-light',
              )} transparent transparent`,
            }}
          />
          <div className='bg-gray-light w-full sm:w-80 px-3 py-2 text-base'>
            {children}{' '}
            <CustomLink
              className='underline text-black hover:text-grey'
              href={linkUrl}
              disableMagenta={true}
            >
              {learnMoreLabel}
            </CustomLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default ByTheNumbersTooltip;
