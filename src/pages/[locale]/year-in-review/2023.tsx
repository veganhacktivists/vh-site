import { NextSeo } from 'next-seo';
import React from 'react';
import { useIntl } from 'react-intl';

import Hero from '../../../components/decoration/hero';
import { YearInReviewHeader } from '../../../components/layout/yearInReview/layout';
import Intro from '../../../components/layout/yearInReview/2023/intro';

import VioletStudios from 'components/layout/yearInReview/2023/violetStudios';
import Granti from 'components/layout/yearInReview/2023/granti';
import TodayForAnimals from 'components/layout/yearInReview/2023/today-for-animals';
import Playground from 'components/layout/yearInReview/2023/playground';
import Leadership from 'components/layout/yearInReview/2023/leadership';
import Partnerships from 'components/layout/yearInReview/2023/partnerships';
import Collaborations from 'components/layout/yearInReview/2023/collaborations';
import Knowledge from 'components/layout/yearInReview/2023/knowledge';
import TechAndData from 'components/layout/yearInReview/2023/tech-and-data';
import TheoryOfChange from 'components/layout/yearInReview/2023/theoryOfChange';
import BigImpact from 'components/layout/yearInReview/2023/bigImpact';
import MovingForward from 'components/layout/yearInReview/2023/movingForward';
import ByTheNumbers from 'components/layout/yearInReview/2023/byTheNumbers';

import heroTagline from '~images/yearInReview/2023/2023-type.png';
import heroBackground from '~images/yearInReview/2023/2023-hero.jpg';

const YearInReview2023: React.FC = ({}) => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.year-in-review.2023.next-seo.title',
          defaultMessage: '2023 in Review',
        })}
      />
      <div className='text-2xl'>
        <YearInReviewHeader
          year={2023}
          hero={
            <Hero
              imageBackground={heroBackground}
              tagline={{
                image: heroTagline,
                alt: intl.formatMessage({
                  id: 'page.year-in-review.2023.section.header.image.alt-text',
                  defaultMessage: '2023 year in review',
                }),
              }}
              alignment='left'
              classNameMapping={{
                container: 'bg-center',
                backgroundImage: 'object-[67%_25%]',
              }}
            />
          }
          customMainSection={
            <div className='text-center text-xl md:w-3/4 pb-10 mx-auto space-y-5 mt-12 px-5 max-w-4xl'>
              <h2 className='text-5xl font-mono font-bold'>
                {intl.formatMessage({
                  id: 'page.year-in-review.2023.section.header.title',
                  defaultMessage:
                    'Serving Our Movement with New Tools & Technology',
                })}
              </h2>
              <p>
                {intl.formatMessage({
                  id: 'page.year-in-review.2023.section.header.content',
                  defaultMessage:
                    "In <no-localization>2023</no-localization>, we strengthened our role as capacity builders, saving the movement the largest amount of funds in our history. By serving over <no-localization>130</no-localization> organizations this year alone with our tech, design, and advisory services, we managed to save the movement a staggering <no-localization>$750k</no-localization>. As we continue through <no-localization>2024</no-localization>, we maintain our focus on leveraging the solid foundation we've built in <no-localization>2023</no-localization> to continue addressing the existing gaps within our movement and making the animal advocacy space more powerful than before.",
                })}
              </p>
            </div>
          }
        />
        <Intro />
        <VioletStudios />
        <Granti />
        <TodayForAnimals />
        <Playground />
        <Leadership />
        <Partnerships />
        <Collaborations />
        <Knowledge />
        <TechAndData />
        <TheoryOfChange />
        <BigImpact />
        <ByTheNumbers />
        <MovingForward />
      </div>
    </>
  );
};

export default YearInReview2023;
