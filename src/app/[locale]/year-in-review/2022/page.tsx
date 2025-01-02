import React from 'react';

import Hero from 'components/decoration/hero';
import { YearInReviewHeader } from 'components/layout/yearInReview/layout';
import MoreEffectiveTeams from 'components/layout/yearInReview/2022/moreEffectiveTeams';
import Intro from 'components/layout/yearInReview/2022/intro';
import MinorChangesBigImpact from 'components/layout/yearInReview/2022/minorChangesBigImpact';
import ByTheNumbers from 'components/layout/yearInReview/2022/byTheNumbers';
import Playground from 'components/layout/yearInReview/2022/playground';
import NewVideos from 'components/layout/yearInReview/2022/newVideos';
import MovingForward from 'components/layout/yearInReview/2022/movingForward';
import SharingKnowledgeAndSupport from 'components/layout/yearInReview/2022/sharingKnowledgeAndSupport';
import FeaturedInterviews from 'components/layout/yearInReview/2022/featuredInterviews';
import GrantProgram from 'components/layout/yearInReview/2022/grantProgram';
import AnimalRightsAdvocates from 'components/layout/yearInReview/2022/animalRightsAdvocates';
import StateOfData from 'components/layout/yearInReview/2022/stateOfData';
import BonusProjects from 'components/layout/yearInReview/2022/bonusProjects';
import getServerIntl from 'app/intl';

import type { Metadata } from 'next';

import heroTagline from '~images/yearInReview/2022/2022-type.png';
import heroBackground from '~images/yearInReview/2022/2022-hero.jpg';

interface Props {
  params: {
    locale: string;
  };
}

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const intl = getServerIntl(locale);

  return {
    title: intl.formatMessage({
      id: 'page.year-in-review.2022.next-seo.title',
      defaultMessage: '2022 in Review',
    }),
  };
}

const YearInReview2022: React.FC<Props> = ({ params: { locale } }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <div className='text-2xl'>
        <YearInReviewHeader
          year={2022}
          hero={
            <Hero
              imageBackground={heroBackground}
              tagline={{
                image: heroTagline,
                alt: intl.formatMessage({
                  id: 'page.year-in-review.2022.section.header.image.alt-text',
                  defaultMessage: '2022 year in review',
                }),
              }}
              alignment='left'
              classNameMapping={{
                container: 'bg-center',
                backgroundImage: 'object-[72%_40%]',
              }}
            />
          }
        />

        <Intro locale={locale} />
        <MoreEffectiveTeams locale={locale} />
        <FeaturedInterviews
          interviews={[
            'leaders-in-animal-protection-jo-anne-mcarthur',
            'leaders-in-animal-protection-elly-nakajima',
            'leaders-in-animal-protection-lauren-ornelas',
            'leaders-in-animal-protection-aryenish-birdie',
            'leaders-in-animal-protection-aj-dahiya',
            'leaders-in-animal-protection-brooke-haggerty',
          ]}
          locale={locale}
        />
        <GrantProgram locale={locale} />
        <Playground locale={locale} />
        <NewVideos locale={locale} />
        <AnimalRightsAdvocates locale={locale} />
        <ByTheNumbers locale={locale} />
        <StateOfData locale={locale} />
        <BonusProjects locale={locale} />
        <MinorChangesBigImpact locale={locale} />
        <SharingKnowledgeAndSupport locale={locale} />
        <MovingForward locale={locale} />
      </div>
    </>
  );
};

export default YearInReview2022;
