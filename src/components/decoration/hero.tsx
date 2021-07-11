import React from 'react';
import classNames from 'classnames';

interface HeroClassNames {
  container?: string;
  content?: string;
}
interface HeroProps {
  imageBackground: string | StaticImageData;
  alignment: 'right' | 'left';
  classNameMapping?: HeroClassNames;
}

const getStyle = (imageBackground: string | StaticImageData) =>
  typeof imageBackground === 'string'
    ? { backgroundImage: `url("${imageBackground}")` }
    : {
        backgroundImage: `url("${imageBackground.src}")`,
        width: `${imageBackground.width}px`,
        height: `${imageBackground.height}px`,
      };

const Hero: React.FC<HeroProps> = ({
  imageBackground,
  alignment,
  children,
  classNameMapping,
}) => {
  const containerClasses = classNames(
    'relative',
    'md:-top-20 md:-mb-20',
    'p-10 md:p-32',
    'bg-scroll',
    'bg-cover',
    'bg-no-repeat',
    'flex',
    {
      'justify-start': alignment === 'left',
      'justify-end': alignment === 'right',
    },
    classNameMapping?.container
  );
  const contentClasses = classNames(
    'flex',
    'flex-col',
    'justify-center',
    'w-1/2',
    classNameMapping?.content
  );

  const style = getStyle(imageBackground);

  return (
    <div className={containerClasses} style={style}>
      <div className={contentClasses}>{children}</div>
    </div>
  );
};

export default Hero;
