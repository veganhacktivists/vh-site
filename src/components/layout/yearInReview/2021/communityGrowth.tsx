import React from 'react';

import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';

import CustomImage from 'components/decoration/customImage';
import getServerIntl from 'app/intl';

import type { IntlShape } from 'react-intl';
import type { StaticImageData } from 'next/image';

import docImage from '~images/yearInReview/2021/comm_docs.png';
import safetyImage from '~images/yearInReview/2021/comm_safety.png';
import techImage from '~images/yearInReview/2021/comm_tech.png';

const getGrowthPoints: (intl: IntlShape) => {
  image: StaticImageData;
  header: React.ReactNode;
  content: React.ReactNode;
}[] = (intl) => [
  {
    image: docImage,
    header: intl.formatMessage({
      id: 'page.year-in-review.2021.section.community-growth.documentation.heading',
      defaultMessage: 'Documentation',
    }),
    content: intl.formatMessage({
      id: 'page.year-in-review.2021.section.community-growth.documentation.paragraph',
      defaultMessage:
        "Growth doesn't just come in numbers, it comes in structure. We combined our organization documentation from four different platforms into one user-friendly section of our new website.",
    }),
  },
  {
    image: techImage,
    header: intl.formatMessage({
      id: 'page.year-in-review.2021.section.community-growth.technology.heading',
      defaultMessage: 'Technology',
    }),
    content: intl.formatMessage({
      id: 'page.year-in-review.2021.section.community-growth.technology.paragraph',
      defaultMessage:
        "We've embraced new technologies to improve the overall quality and robustness of our projects, as well as meet our developers where they're at.",
    }),
  },
  {
    image: safetyImage,
    header: intl.formatMessage({
      id: 'page.year-in-review.2021.section.community-growth.safety.heading',
      defaultMessage: 'Safety',
    }),
    content: intl.formatMessage({
      id: 'page.year-in-review.2021.section.community-growth.safety.paragraph',
      defaultMessage:
        'We now have a Code of Conduct for our growing community, and ask all volunteers to complete our Effective Communication, Unconscious Bias, and Consent training courses in order to foster a healthy and inclusive environment.',
    }),
  },
];

interface Props {
  locale: string;
}

const imageDimension = 150;

const CommunityGrowth: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);
  const growthPoints = getGrowthPoints(intl);

  return (
    <>
      <SectionContainer
        header={
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.year-in-review.2021.section.community-growth.headline',
              defaultMessage: 'Encouraging <b>community growth</b>',
            })}
            className='text-grey'
          />
        }
      >
        <div>
          <div className='mx-auto md:w-2/3 pb-10'>
            {growthPoints.map(({ image, header, content }) => (
              <div
                key={image.src}
                className='flex flex-col md:flex-row gap-x-10 mb-10 last:mb-0 pt-10'
              >
                <div className={'shrink-0'}>
                  <CustomImage
                    src={image}
                    alt=''
                    height={imageDimension}
                    width={imageDimension}
                  />
                </div>
                <div className='md:text-left'>
                  <h2 className='text-4xl font-bold text-grey mb-4'>
                    {header}
                  </h2>
                  <div className='text-2xl'>{content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default CommunityGrowth;
