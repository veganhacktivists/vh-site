import classNames from 'classnames';
import React, { Fragment } from 'react';

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type textSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';

interface SubSectionContent extends React.PropsWithChildren {
  header?: string;
  headerSize?: textSize;
  contentSize?: textSize;
  textColor?: string;
  className?: string;
  spacing?: number;
}

interface SectionHeaderProps
  extends React.PropsWithChildren<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  > {
  header: string;
  stackEntries?: boolean;
  className?: string;
  rootClassName?: string;
  smallOnMobile?: boolean;
}

export function parseBoldText(text: string) {
  const boldStart = '<b>';
  const boldEnd = '</b>';

  text = text.trim();

  const startWithBoldFont = text.startsWith(boldStart);

  return {
    startWithBoldFont,
    splitTextComponents: text
      .replace(new RegExp(`${boldEnd}(\\s*)${boldStart}`, 'i'), '$1')
      .split(new RegExp(`(${boldStart}|${boldEnd})`, 'i'))
      .map((component) => component.trim())
      .filter(Boolean)
      .filter((component) => component !== boldStart && component !== boldEnd),
  };
}

// TODO: this file is a mess, I wanna speak to Kate and determine all the headers we might need,
// in the sorts of custom <H1> components
export const SectionHeader = ({
  header,
  stackEntries = false,
  className,
  rootClassName,
  children,
  smallOnMobile = false,
  ...props
}: SectionHeaderProps) => {
  const { startWithBoldFont, splitTextComponents: headerComponents } =
    parseBoldText(header);

  const boldClasses = `${
    smallOnMobile ? 'text-4xl' : 'text-5xl'
  } md:text-6xl font-mono font-semibold uppercase mx-1`;
  const italicClasses = classNames(
    `${smallOnMobile ? 'text-3xl md:' : ''}text-4xl font-serif italic  mx-1`,
    'font-bold',
  );

  return (
    <div {...props} className={rootClassName}>
      <h2 aria-label={headerComponents.join(' ')}>
        <div className={className}>
          {headerComponents.map((content, i) => {
            const italics = i % 2 === +startWithBoldFont;
            return (
              <Fragment key={i}>
                <span
                  className={classNames({
                    [italicClasses]: italics,
                    [boldClasses]: !italics,
                    'block leading-11': stackEntries,
                    'pt-2': stackEntries && !italics,
                  })}
                >
                  {content}
                </span>
                {i !== headerComponents.length - 1 && ' '}
              </Fragment>
            );
          })}
        </div>
      </h2>
      {children && <div className='mt-5 mb-20 text-2xl'>{children}</div>}
    </div>
  );
};

const BoldHeaderText: React.FC<SubSectionContent> = ({
  children,
  className = 'text-black',
}) => {
  const classes = classNames(
    'font-mono font-bold text-5xl uppercase',
    className,
  );
  return <span className={classes}>{children}</span>;
};

const HeaderContainer: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className = 'text-grey' }) => {
  return (
    <div
      className={classNames(
        'content-center px-5 mx-auto my-12 md:w-1/2 text-2xl',
        className,
      )}
    >
      <h1 className='mb-10'>{children}</h1>
    </div>
  );
};

export const FirstSubSection: React.FC<SubSectionContent> = ({
  header = '',
  children,
  className = 'text-grey',
}) => {
  return (
    <HeaderContainer className={className}>
      <SectionHeader header={header} />
      <div>{children}</div>
    </HeaderContainer>
  );
};

export const PlainHeader: React.FC<SubSectionContent> = ({
  header = '',
  children,
}) => {
  return (
    <HeaderContainer>
      <BoldHeaderText>{header}</BoldHeaderText>
      <p className='text-2xl'>{children}</p>
    </HeaderContainer>
  );
};

export const SubSection: React.FC<SubSectionContent> = ({
  header,
  children,
  headerSize = '2xl',
  contentSize = 'xl',
  textColor = 'black',
  spacing = 10,
}) => {
  return (
    <div className={`mb-${spacing}`}>
      {header && (
        <h1 className={`text-${headerSize} text-${textColor}  mb-3 font-bold`}>
          {header}
        </h1>
      )}
      <div
        className={`max-w-2xl text-${contentSize} text-${textColor} m-auto px-10`}
      >
        {children}
      </div>
    </div>
  );
};
