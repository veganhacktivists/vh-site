import React, { Fragment } from 'react';

import getThemeColor from 'lib/helpers/theme';
import { parseBoldText } from 'components/decoration/textBlocks';

interface HighlightBlockProps extends React.PropsWithChildren {
  borderColor: string;
  /**
   * Text may contain <b> and </b> tags to mark bold text.
   */
  header: string;
}

export const HighlightBlock: React.FC<HighlightBlockProps> = ({
  borderColor,
  header,
  children,
}) => {
  const { startWithBoldFont, splitTextComponents } = parseBoldText(header);

  return (
    <div className='flex flex-col md:flex-row xl:w-2/3 2xl:w-2/3 mx-auto mb-8'>
      <h1
        className='md:leading-[1.3] text-left flex-1 font-mono bg-black text-white text-4xl md:text-5xl p-10 border-l-16 uppercase'
        style={{ borderColor: getThemeColor(borderColor) }}
      >
        {splitTextComponents.map((content, i) => {
          const isBold = i % 2 !== +startWithBoldFont;
          return (
            <Fragment key={i}>
              {isBold ? <b>{content}</b> : content}
              {i !== splitTextComponents.length - 1 && ' '}
            </Fragment>
          );
        })}
      </h1>
      <p className='text-center md:text-left flex-1 text-2xl p-10 bg-grey-background'>
        {children}
      </p>
    </div>
  );
};
