import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

import PixelCow from '../../../../public/images/VH_PixelCow.png';
import {
  SubSection,
  FirstSubSection,
} from '../../../components/decoration/textBlocks';
import AboutLayout from '../../../components/layout/about';

import CustomImage from 'components/decoration/customImage';

import type PageWithLayout from '../../../types/persistentLayout';

const OurMission: PageWithLayout = () => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.about.section.our-mission.next-seo.title',
          defaultMessage: 'Our Mission',
        })}
      />
      <FirstSubSection
        header={intl.formatMessage({
          id: 'page.about.section.our-mission.section-header.heading',
          defaultMessage: 'Our <b>mission</b>',
        })}
      >
        <FormattedMessage
          id='page.about.section.our-mission.section-header.content'
          defaultMessage='Our mission is to build data-driven, disruptive, and innovative projects to help see an end to animal exploitation. We believe the animal protection movement has five fundamental areas for improvement, which we aim to solve through our work.'
        />
      </FirstSubSection>
      <div className='pb-10 m-10'>
        <div className='pb-5'>
          <CustomImage
            src={PixelCow.src}
            width={PixelCow.width / 3}
            height={PixelCow.height / 3}
            alt={intl.formatMessage({
              id: 'page.about.section.our-mission.section-header.image.alt-text',
              defaultMessage: 'Our mission',
            })}
          />
        </div>
        <div>
          <SubSection
            header={intl.formatMessage({
              id: 'page.about.section.our-mission.subsection-0.heading',
              defaultMessage: '1. We need more data in our movement.',
            })}
          >
            <FormattedMessage
              id='page.about.section.our-mission.subsection-0.paragraph'
              defaultMessage='To determine effectiveness in projects, campaigns, and our work as a whole, meaningful data needs to be tracked and collected. We strongly believe that a data-driven movement will accelerate and elevate our work, which is why we prioritize identifying, gathering, and analyzing data, as well as making it accessible to others.'
            />
          </SubSection>
          <SubSection
            header={intl.formatMessage({
              id: 'page.about.section.our-mission.subsection-1.heading',
              defaultMessage: '2. We need more competition, too.',
            })}
          >
            <FormattedMessage
              id='page.about.section.our-mission.subsection-1.paragraph'
              defaultMessage="We strongly believe competition is not only healthy but vital in improving our movement's effectiveness. Competition applies healthy pressure on organizations and projects to keep improving and iterating - and this gives us more information on what works."
            />
          </SubSection>
          <SubSection
            header={intl.formatMessage({
              id: 'page.about.section.our-mission.subsection-2.heading',
              defaultMessage: '3. We need to be more innovative.',
            })}
          >
            <FormattedMessage
              id='page.about.section.our-mission.subsection-2.paragraph'
              defaultMessage='We believe the movement has the potential to be more innovative in its approaches. We promote outside-the-box thinking and make innovation a core consideration of every part of our work and our processes.'
            />
          </SubSection>
          <SubSection
            header={intl.formatMessage({
              id: 'page.about.section.our-mission.subsection-3.heading',
              defaultMessage: '4. And we need to start collaborating.',
            })}
          >
            <FormattedMessage
              id='page.about.section.our-mission.subsection-3.paragraph'
              defaultMessage='We aim to help organizations and individuals connect and collaborate in more meaningful ways. We need to leverage our knowledge and network with each other to support our shared goals, whether that means sharing research or data, resources, or generally supporting each other overcome organizational challenges.'
            />
          </SubSection>
          <SubSection
            header={intl.formatMessage({
              id: 'page.about.section.our-mission.subsection-4.heading',
              defaultMessage:
                '5. Finally, we need more vegans to become active.',
            })}
          >
            <FormattedMessage
              id='page.about.section.our-mission.subsection-4.paragraph'
              defaultMessage='Only a tiny percentage of the world is vegan, and a fraction within are active. Many organizations encourage non-vegans to adopt veganism through health, environmental, or ethical reasons. We believe that we can also be effective by creating tools to help, inspire, and motivate more vegans to become advocates for the animals.'
            />
          </SubSection>
        </div>
      </div>
    </>
  );
};

OurMission.Layout = AboutLayout;

export default OurMission;
