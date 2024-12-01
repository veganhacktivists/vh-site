import React from 'react';
import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

import SquareField from '../../../components/decoration/squares';
import PeopleLayout from '../../../components/layout/people';
import { FirstSubSection } from '../../../components/decoration/textBlocks';
import { getContents } from '../../../lib/cms';
import ContentfulImage from '../../../components/layout/contentfulImage';
import SocialLinks from '../../../components/layout/team/socialLinks';
import { pixelHeart } from '../../../images/separators';

import CustomImage from 'components/decoration/customImage';

import type PageWithLayout from '../../../types/persistentLayout';
import type { ITeamMember } from '../../../types/generated/contentful';
import type { GetStaticProps } from 'next';

const TEAM_SQUARES = [
  { color: 'grey-light', size: 16, left: 0, bottom: 0 },
  { color: 'grey-lighter', size: 16, left: 16, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
  { color: 'white', size: 16, right: 0, top: 0 },
];

export const getStaticProps: GetStaticProps = async () => {
  const advisors = await getContents<ITeamMember>({
    contentType: 'teamMember',
    query: {
      type: 'advisor',
    },
  });

  return {
    props: { advisors },
    revalidate: 480,
  };
};

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

const AdvisorCard: React.FC<{ advisor: ITeamMember }> = ({ advisor }) => {
  const { name, image, socialLinks, position } = advisor.fields;
  return (
    <div className='w-64'>
      <div className='flex justify-end mb-2 bg-grey'>
        {image && <ContentfulImage image={image} alt={name} />}
        <div className={'absolute w-8 h-8'} />
      </div>
      <div className='w-5/6 mx-auto my-0 text-left'>
        <div className='text-2xl font-bold'>{name}</div>
        <div className='font-serif italic'>{position}</div>
        {socialLinks && (
          <div className='mt-2'>
            <SocialLinks
              socialLinks={socialLinks.fields}
              className='justify-start'
            />
          </div>
        )}
      </div>
    </div>
  );
};
interface AdvisorsProps {
  advisors: ITeamMember[];
}

const Advisors: PageWithLayout<AdvisorsProps> = ({ advisors }) => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.people.section.advisors.next-seo.title',
          defaultMessage: 'Our Advisors',
        })}
      />
      <FirstSubSection
        header={intl.formatMessage({
          id: 'page.people.section.advisors.intro.heading',
          defaultMessage: 'Our <b>advisors</b>',
        })}
      >
        <FormattedMessage
          id='page.people.section.advisors.intro.paragraph'
          defaultMessage='We are incredibly thankful for our team of experienced advisors who provide guidance and direction to the organization, its strategy, and projects.'
        />
      </FirstSubSection>
      <div className='mx-auto my-10 lg:w-2/3'>
        <div className='grid justify-center md:grid-cols-3 '>
          {advisors.map((advisor) => (
            <div className='mx-auto my-5' key={advisor.sys.id}>
              <AdvisorCard advisor={advisor} />
            </div>
          ))}
        </div>
      </div>
      <SquareField squares={TEAM_SQUARES} className='hidden md:block' />
      <div className='pt-16 pb-10 bg-grey-light'>
        <CustomImage
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt={intl.formatMessage({
            id: 'page.people.section.advisors.community.image.alt-text',
            defaultMessage: 'Our community',
          })}
        />
        <FirstSubSection
          header={intl.formatMessage({
            id: 'page.people.section.advisors.community.heading',
            defaultMessage: 'Our <b>community</b>',
          })}
        >
          <FormattedMessage
            id='page.people.section.advisors.community.paragraph'
            defaultMessage='We are more than a group of volunteers; we are a community tethered by shared values and invested in a vision of a better world for animals. We believe in a community-first approach: one that is supportive, growth-oriented, and accountable to each other. If this resonates with you, scroll down to learn more.'
          />
        </FirstSubSection>
      </div>
    </>
  );
};

Advisors.Layout = PeopleLayout;

export default Advisors;
