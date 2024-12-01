import React from 'react';
import { useIntl } from 'react-intl';

import impactReviewImage from '../../../../public/images/grants/impact-header.png';
import beeImage from '../../../../public/images/grants/bee-header.png';
import beeIcon from '../../../../public/images/grants/VH-icon-bee.png';
import { DarkButton } from '../../decoration/buttons';
import getThemeColor from '../../../lib/helpers/theme';
import { pixelFlower } from '../../../images/separators';

import CustomImage from 'components/decoration/customImage';

import type { StaticImageData } from 'next/image';

interface InfoProps extends React.PropsWithChildren {
  title: string;
  image: StaticImageData;
  boxicon: StaticImageData;
  backgroundColor?: string;
  button: {
    content: React.ReactNode;
    href: string;
  };
}

const Info: React.FC<InfoProps> = ({
  children,
  title,
  boxicon,
  image,
  backgroundColor = 'white',
  button,
}) => {
  const color = getThemeColor(backgroundColor);
  return (
    <div style={{ backgroundColor: color }} className='flex flex-col gap-14'>
      <div className='w-full overflow-hidden'>
        <CustomImage src={image} alt='' />
      </div>
      <div className='items-center'>
        <div className='max-w-sm px-10 text-left break-words md:pb-8'>
          <div className='pt-10 mb-10 font-mono text-3xl font-semibold uppercase text-grey-dark md:text-4xl md:px-2'>
            {title}
          </div>
          <div className='mb-8 text-2xl md:mb-0'>{children}</div>
        </div>
        <div className='flex flex-row justify-between px-10 h-'>
          <DarkButton className='md:max-w-72 h-fit' href={button.href}>
            {button.content}
          </DarkButton>
          <div className='w-1/4'>
            <CustomImage
              src={boxicon}
              alt=''
              height={(boxicon.height / boxicon.width) * 100}
              width={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const GrantsCallToAction: React.FC = () => {
  const intl = useIntl();
  return (
    <div className='pb-10 bg-gray-background pt-14'>
      <div className='grid grid-cols-1 gap-0 mx-auto mb-20 md:grid md:grid-cols-2 md:w-2/3 auto-rows-fr'>
        <Info
          image={beeImage}
          boxicon={beeIcon}
          backgroundColor='white'
          title={intl.formatMessage({
            id: 'section.grants-cta.apply.heading',
            defaultMessage: 'Apply for a seed grant',
          })}
          button={{
            content: intl.formatMessage({
              id: 'section.grants-cta.apply.cta',
              defaultMessage: 'Apply Now',
            }),
            href: `/${intl.locale}/grants`,
          }}
        >
          {intl.formatMessage({
            id: 'section.grants-cta.apply.paragraph',
            defaultMessage:
              'We connect you with funders for impactful work in animal advocacy and activism.',
          })}
        </Info>
        <Info
          image={impactReviewImage}
          boxicon={pixelFlower}
          title={intl.formatMessage({
            id: 'section.grants-cta.visit-year-review.heading',
            defaultMessage: 'See our 2023 impact review',
          })}
          backgroundColor='grey-over-background'
          button={{
            content: intl.formatMessage({
              id: 'section.grants-cta.visit-year-review.cta',
              defaultMessage: 'See our impact',
            }),
            href: `/${intl.locale}/year-in-review/2023`,
          }}
        >
          {intl.formatMessage({
            id: 'section.grants-cta.visit-year-review.paragraph',
            defaultMessage:
              "Read our annual impact review and see what we've accomplished last year.",
          })}
        </Info>
      </div>
    </div>
  );
};

export default GrantsCallToAction;
