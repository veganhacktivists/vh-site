/* eslint-disable react/forbid-elements */
/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames';
import Image from 'next/image';

import type { ImageProps } from 'next/image';

interface CustomImageProps extends ImageProps {
  useNextImage?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({ priority, ...props }) => {
  if (props.useNextImage === false) {
    return (
      // required for the image to redered to a string for transaltions
      // @ts-expect-error ---
      // eslint-disable-next-line @next/next/no-img-element
      <img
        loading='eager'
        {...props}
        className={classNames(
          props.className,
          'max-w-full h-auto inline-block',
        )}
      />
    );
  }

  return (
    <Image
      loading='eager'
      {...props}
      priority={priority}
      className={classNames(props.className, 'max-w-full h-auto inline-block')}
    />
  );
};

export default CustomImage;
