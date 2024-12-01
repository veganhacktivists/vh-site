import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

import PixelChicken from '../../../../public/images/VH_PixelChicken.png';
import {
  FirstSubSection,
  SubSection,
} from '../../../components/decoration/textBlocks';
import AboutLayout from '../../../components/layout/about';

import CustomImage from 'components/decoration/customImage';

import type PageWithLayout from '../../../types/persistentLayout';

const OurValues: PageWithLayout = () => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.about.section.our-values.next-seo.title',
          defaultMessage: 'Our Values',
        })}
      />
      <FirstSubSection
        header={intl.formatMessage({
          id: 'page.about.section.our-values.section-header.heading',
          defaultMessage: 'Our <b>values</b>',
        })}
      >
        <FormattedMessage
          id='page.about.section.our-values.section-header.content'
          defaultMessage='We embrace strong core values for our organization, which drive what we do, how we do it, and how we build community.'
        />
      </FirstSubSection>
      <div className='pb-10 m-10'>
        <div className='pb-5'>
          <CustomImage
            src={PixelChicken.src}
            width={PixelChicken.width / 3}
            height={PixelChicken.height / 3}
            alt={intl.formatMessage({
              id: 'page.about.section.our-values.section-header.image.alt-text',
              defaultMessage: 'Our values',
            })}
          />
        </div>

        <SubSection
          header={intl.formatMessage({
            id: 'page.about.section.our-values.subsection-0.heading',
            defaultMessage: 'Animal Liberation',
          })}
        >
          <FormattedMessage
            id='page.about.section.our-values.subsection-0.paragraph'
            defaultMessage='We value and respect the lives of all animals and denounce all forms of violence and exploitation against them. We believe animals have the right to be free, and we fight for that with our (digital) activism.'
          />
        </SubSection>

        <SubSection
          header={intl.formatMessage({
            id: 'page.about.section.our-values.subsection-1.heading',
            defaultMessage: 'Non-violence',
          })}
        >
          <FormattedMessage
            id='page.about.section.our-values.subsection-1.paragraph'
            defaultMessage='We practice a love-based, community-first organizational approach. We exercise empathy, compassion, and non-violence. We encourage every member to communicate openly and kindly with each other.'
          />
        </SubSection>

        <SubSection
          header={intl.formatMessage({
            id: 'page.about.section.our-values.subsection-2.heading',
            defaultMessage: 'Safe Community',
          })}
        >
          <FormattedMessage
            id='page.about.section.our-values.subsection-2.paragraph'
            defaultMessage='We believe in building and fostering safe and inclusive communities regardless of race, gender, species, age, sexual orientation, or political affiliation. We strive to be diverse and representative of the communities we serve and work with.'
          />
        </SubSection>

        <SubSection
          header={intl.formatMessage({
            id: 'page.about.section.our-values.subsection-3.heading',
            defaultMessage: 'Farmed Animals',
          })}
        >
          <FormattedMessage
            id='page.about.section.our-values.subsection-3.paragraph'
            defaultMessage='We believe farmed animals are in most need of our support, which is why we focus primarily on farmed animal liberation as an organization.'
          />
        </SubSection>

        <SubSection
          header={intl.formatMessage({
            id: 'page.about.section.our-values.subsection-4.heading',
            defaultMessage: 'Open Feedback',
          })}
        >
          <FormattedMessage
            id='page.about.section.our-values.subsection-4.paragraph'
            defaultMessage='We value different viewpoints and constructive feedback from every person. We believe everyone has something of value to contribute to the discussion. We always listen first, then respond constructively.'
          />
        </SubSection>

        <SubSection
          header={intl.formatMessage({
            id: 'page.about.section.our-values.subsection-5.heading',
            defaultMessage: 'Anti-Oppression',
          })}
        >
          <FormattedMessage
            id='page.about.section.our-values.subsection-5.paragraph'
            defaultMessage='We do not support or enable the exploitation or oppression of any group. We believe that the oppression of humans and non-human animals are interlinked, and the work to eradicate all forms of oppression is necessary.'
          />
        </SubSection>
      </div>
    </>
  );
};

OurValues.Layout = AboutLayout;

export default OurValues;
