import { FirstSubSection, SubSection } from 'components/decoration/textBlocks';
import CustomImage from 'components/decoration/customImage';
import getServerIntl from 'app/intl';

import type { Metadata } from 'next';

import PixelChicken from '~images/VH_PixelChicken.png';

interface Props {
  params: {
    locale: string;
  };
}

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const intl = getServerIntl(locale);

  return {
    title: intl.formatMessage({
      id: 'page.about.section.our-values.next-seo.title',
      defaultMessage: 'Our Values',
    }),
  };
}

const OurValues: React.FC<Props> = ({ params: { locale } }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <FirstSubSection
        header={intl.formatMessage({
          id: 'page.about.section.our-values.section-header.heading',
          defaultMessage: 'Our <b>values</b>',
        })}
      >
        {intl.formatMessage({
          id: 'page.about.section.our-values.section-header.content',
          defaultMessage:
            'We embrace strong core values for our organization, which drive what we do, how we do it, and how we build community.',
        })}
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
          {intl.formatMessage({
            id: 'page.about.section.our-values.subsection-0.paragraph',
            defaultMessage:
              'We value and respect the lives of all animals and denounce all forms of violence and exploitation against them. We believe animals have the right to be free, and we fight for that with our (digital) activism.',
          })}
        </SubSection>

        <SubSection
          header={intl.formatMessage({
            id: 'page.about.section.our-values.subsection-1.heading',
            defaultMessage: 'Non-violence',
          })}
        >
          {intl.formatMessage({
            id: 'page.about.section.our-values.subsection-1.paragraph',
            defaultMessage:
              'We practice a love-based, community-first organizational approach. We exercise empathy, compassion, and non-violence. We encourage every member to communicate openly and kindly with each other.',
          })}
        </SubSection>

        <SubSection
          header={intl.formatMessage({
            id: 'page.about.section.our-values.subsection-2.heading',
            defaultMessage: 'Safe Community',
          })}
        >
          {intl.formatMessage({
            id: 'page.about.section.our-values.subsection-2.paragraph',
            defaultMessage:
              'We believe in building and fostering safe and inclusive communities regardless of race, gender, species, age, sexual orientation, or political affiliation. We strive to be diverse and representative of the communities we serve and work with.',
          })}
        </SubSection>

        <SubSection
          header={intl.formatMessage({
            id: 'page.about.section.our-values.subsection-3.heading',
            defaultMessage: 'Farmed Animals',
          })}
        >
          {intl.formatMessage({
            id: 'page.about.section.our-values.subsection-3.paragraph',
            defaultMessage:
              'We believe farmed animals are in most need of our support, which is why we focus primarily on farmed animal liberation as an organization.',
          })}
        </SubSection>

        <SubSection
          header={intl.formatMessage({
            id: 'page.about.section.our-values.subsection-4.heading',
            defaultMessage: 'Open Feedback',
          })}
        >
          {intl.formatMessage({
            id: 'page.about.section.our-values.subsection-4.paragraph',
            defaultMessage:
              'We value different viewpoints and constructive feedback from every person. We believe everyone has something of value to contribute to the discussion. We always listen first, then respond constructively.',
          })}
        </SubSection>

        <SubSection
          header={intl.formatMessage({
            id: 'page.about.section.our-values.subsection-5.heading',
            defaultMessage: 'Anti-Oppression',
          })}
        >
          {intl.formatMessage({
            id: 'page.about.section.our-values.subsection-5.paragraph',
            defaultMessage:
              'We do not support or enable the exploitation or oppression of any group. We believe that the oppression of humans and non-human animals are interlinked, and the work to eradicate all forms of oppression is necessary.',
          })}
        </SubSection>
      </div>
    </>
  );
};

export default OurValues;
