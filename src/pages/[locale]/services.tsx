import React from 'react';
import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

import Hero from '../../components/decoration/hero';
import InfoBox from '../../components/infoBox';
import SquareField from '../../components/decoration/squares';
import Sprite, { pig } from '../../components/decoration/sprite';
import ContactUsForm from '../../components/forms/contactUs';
import { FirstSubSection } from '../../components/decoration/textBlocks';
import { DarkButton } from '../../components/decoration/buttons';
import heroBackground from '../../../public/images/services/VH-chick-hero.jpg';
import heroTagline from '../../../public/images/services/VH-services-hero-text.png';
import adviceIcon from '../../../public/images/services/Services-icon-advice.png';
import fundingIcon from '../../../public/images/services/Services-icon-funding.png';
import projectIcon from '../../../public/images/services/Services-icon-project.png';
import webIcon from '../../../public/images/services/Services-icon-web.png';
import designIcon from '../../../public/images/services/Services-icon-design.png';
import PixelBulb from '../../../public/images/VH_PixelBulb.png';

import CustomImage from 'components/decoration/customImage';

import type { IntlShape } from 'react-intl';
import type { StaticImageData } from 'next/image';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },
  { color: 'green', size: 24, left: 16, bottom: 0 },
  { color: 'red', size: 32, right: 0, top: -16 },
  { color: 'orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

interface ServiceProps {
  title: string;
  icon: StaticImageData;
  iconBgColor: string;
  iconAccentColor: string;
  align: 'left' | 'right';
  content: React.ReactNode;
  button?: {
    text: React.ReactNode;
    href: string;
  };
}

const getServiceBlockProps = (
  intl: IntlShape,
): Omit<ServiceProps, 'align'>[] => [
  {
    title: intl.formatMessage({
      id: 'page.services.section.service-block.0.title',
      defaultMessage: 'Websites',
    }),
    content: intl.formatMessage({
      id: 'page.services.section.service-block.0.content',
      defaultMessage:
        "If you're an independent activist or organization with little to no funding, you're the ones we want to help! We support advocates who have few resources dedicated to website design, development, and/or have limited knowledge or time to build it themselves.",
    }),
    icon: webIcon,
    iconBgColor: 'magenta',
    iconAccentColor: 'red',
    button: {
      text: intl.formatMessage({
        id: 'page.services.section.service-block.0.button-label',
        defaultMessage: 'Apply for a free website',
      }),
      href: `/${intl.locale}/playground`,
    },
  },
  {
    title: intl.formatMessage({
      id: 'page.services.section.service-block.1.title',
      defaultMessage: 'Design',
    }),
    content: intl.formatMessage({
      id: 'page.services.section.service-block.1.content',
      defaultMessage:
        'Our sister organization, Violet Studios, offers several design services across branding, web design, document design, and more. They collaborate closely with you to understand who you are and what your needs are, so that they can best curate your digital presence.',
    }),
    icon: designIcon,
    iconBgColor: 'yellow-dark',
    iconAccentColor: 'yellow-orange',
    button: {
      text: intl.formatMessage({
        id: 'page.services.section.service-block.1.button-label',
        defaultMessage: 'Apply for free design support',
      }),
      href: 'https://violetstudios.org',
    },
  },
  {
    title: intl.formatMessage({
      id: 'page.services.section.service-block.2.title',
      defaultMessage: 'Projects',
    }),
    content: intl.formatMessage({
      id: 'page.services.section.service-block.2.content',
      defaultMessage:
        "Do you have an idea that would help bring us closer to a vegan world? Whether it's an app, event, or media that you are interested in producing, we'll help get the resources you need to get your idea off the ground. If the concept is aligned with our work, we'd be happy to explore partnerships.",
    }),
    icon: projectIcon,
    iconBgColor: 'green',
    iconAccentColor: 'green-dark',
    button: {
      text: intl.formatMessage({
        id: 'page.services.section.service-block.2.button-label',
        defaultMessage: "Let's chat about your idea",
      }),
      href: '#contact-us',
    },
  },
  {
    title: intl.formatMessage({
      id: 'page.services.section.service-block.3.title',
      defaultMessage: 'Funding',
    }),
    content: intl.formatMessage({
      id: 'page.services.section.service-block.3.content',
      defaultMessage:
        'We connect you with funders providing up to $1,000 USD in seed funding for animal rights activism! We seek individual and groups whose primary purpose is to help reduce suffering for farmed animals.',
    }),
    icon: fundingIcon,
    iconBgColor: 'yellow',
    iconAccentColor: 'yellow-dark',
    button: {
      text: intl.formatMessage({
        id: 'page.services.section.service-block.3.button-label',
        defaultMessage: 'Learn about our grant program',
      }),
      href: `/${intl.locale}/grants`,
    },
  },
  {
    title: intl.formatMessage({
      id: 'page.services.section.service-block.4.title',
      defaultMessage: 'Advice',
    }),
    content: intl.formatMessage({
      id: 'page.services.section.service-block.4.content',
      defaultMessage:
        'Our advisory and core team members have a plethora of experience in tech, design, and nonprofit management. We are happy to advise individuals and organizations to the best of our abilities, whether it be technology, organizational strategy, marketing, or fundraising.',
    }),
    icon: adviceIcon,
    iconBgColor: 'orange',
    iconAccentColor: 'orange-dark',
    button: {
      text: intl.formatMessage({
        id: 'page.services.section.service-block.4.button-label',
        defaultMessage: 'Contact us for advice',
      }),
      href: '#contact-us',
    },
  },
];

const Service: React.FC<ServiceProps> = ({
  title,
  content,
  icon,
  iconBgColor,
  iconAccentColor,
  align,
  button,
}) => {
  return (
    <div key={title}>
      <InfoBox
        key={title}
        title={title}
        icon={icon}
        iconBgColor={iconBgColor}
        iconAccentColor={iconAccentColor}
        align={align}
      >
        <p className='mt-3 mb-7'>{content}</p>
        {button && (
          <DarkButton className='max-w-sm' href={button.href}>
            {button.text}
          </DarkButton>
        )}
      </InfoBox>
    </div>
  );
};

const Services: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.services.next-seo.title',
          defaultMessage: 'Services',
        })}
      />
      <div>
        <Hero
          imageBackground={heroBackground}
          tagline={{
            image: heroTagline,
            alt: intl.formatMessage({
              id: 'page.services.section.hero.image-alt',
              defaultMessage: 'Supporting the Animal Protection Movement',
            }),
          }}
          alignment='left'
          classNameMapping={{
            container: 'bg-center',
            backgroundImage: 'object-[75%_0] md:object-center',
          }}
        />
        <SquareField
          squares={HERO_DECORATION_SQUARES}
          className='hidden md:block'
        />
        <FirstSubSection
          header={intl.formatMessage({
            id: 'page.services.section.our-services.header.text',
            defaultMessage: 'Our <b>services</b>',
          })}
        >
          <FormattedMessage
            id='page.services.section.our-services.content.0'
            defaultMessage="As capacity builders, we offer our skills and services to the animal protection movement. From development and design to content creation, volunteers, and operational advice, we're here to help elevate your work for the animals."
          />
        </FirstSubSection>
        <div className='flex flex-col items-center mx-auto mb-20 text-2xl md:space-y-20'>
          {getServiceBlockProps(intl).map((service, index) => (
            <Service
              key={service.title}
              align={index % 2 === 0 ? 'left' : 'right'}
              {...service}
            />
          ))}
        </div>
        <div className='flex flex-col items-center justify-center w-full mx-auto mb-20 text-2xl gap-y-4 xl:w-3/5'>
          <CustomImage
            src={PixelBulb}
            alt=''
            height={PixelBulb.height / 3}
            width={PixelBulb.width / 3}
          />

          <div className='px-3 text-center text-grey-darker md:w-2/3'>
            <FormattedMessage
              id='page.services.section.our-services.content.1'
              defaultMessage='Given our capacity and your organizational needs, we may consider taking on paid projects that need dedicated or priority support. If this is your situation, please contact us below and we will explore how best to scope the work to fit within your budget.'
            />
          </div>
        </div>
      </div>
      <Sprite image={pig} pixelsLeft={3} pixelsRight={1} />
      <SquareField
        squares={[
          { size: 16, color: 'grey-background', bottom: 0, left: 0 },
          { size: 16, color: 'white', top: 0, left: 32 },
          { size: 16, color: 'grey-background', bottom: 0, right: 0 },
          { size: 16, color: 'white', top: 0, right: 0 },
        ]}
        className='hidden md:block'
      />
      <div className='px-10 pt-10 bg-grey-background md:px-0'>
        <div className='py-5 mx-auto text-xl md:w-1/2 text-grey-dark'>
          <FormattedMessage
            id='page.services.section.contact.content'
            defaultMessage="If you'd like to discuss any of our service offerings, please use our our contact form to get in touch. We do our best to promptly respond to every inquiry."
          />
        </div>
        <ContactUsForm />
      </div>
    </>
  );
};

export default Services;
