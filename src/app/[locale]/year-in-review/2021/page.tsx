import React from 'react';

import { defaultLocale } from '../../../../../translation/defaultLocale';

import Hero from 'components/decoration/hero';
import { YearInReviewHeader } from 'components/layout/yearInReview/layout';
import FeedbackAndTesting from 'components/layout/yearInReview/2021/feedbackAndTesting';
import CommunityGrowth from 'components/layout/yearInReview/2021/communityGrowth';
import AnimatedVideos from 'components/layout/yearInReview/2021/animatedVideos';
import Intro from 'components/layout/yearInReview/2021/intro';
import MinorChangesBigImpact from 'components/layout/yearInReview/2021/minorChangesBigImpact';
import DesignsForVeganOrgs from 'components/layout/yearInReview/2021/designsForVeganOrgs';
import FeaturedBlogPosts from 'components/layout/yearInReview/2021/featuredBlogPosts';
import { getContents } from 'lib/cms';
import { sortByArray } from 'lib/helpers/array';
import { getProjectDescriptions } from 'components/layout/yearInReview/2021/featuredProjects';
import FeaturedProjects from 'components/layout/yearInReview/2021/featuredProjects';
import Rebrand from 'components/layout/yearInReview/2021/rebrand';
import Partnerships from 'components/layout/yearInReview/2021/partnerships';
import NewsletterLaunch from 'components/layout/yearInReview/2021/newsletterLaunch';
import AdvisoryService from 'components/layout/yearInReview/2021/advisoryService';
import ByTheNumbers from 'components/layout/yearInReview/2021/byTheNumbers';
import Playground from 'components/layout/yearInReview/2021/playground';
import MovingForward from 'components/layout/yearInReview/2021/movingForward';
import getServerIntl from 'app/intl';

import type { Metadata } from 'next';
import type { FeaturedProjectsProps } from 'components/layout/yearInReview/2021/featuredProjects';
import type {
  IBlogEntry,
  IBlogEntryFields,
  IProjectFields,
  ITagFields,
  ITeamMember,
  ITeamMemberFields,
} from 'types/generated/contentful';
import type {
  BlogPostItem,
  FeaturedBlogPostsProps,
} from 'components/layout/yearInReview/2021/featuredBlogPosts';

import heroTagline from '~images/yearInReview/2021/2021-type.png';
import heroBackground from '~images/yearInReview/2021/2021-hero.jpg';

interface Props {
  params: {
    locale: string;
  };
}

async function loadContent(): Promise<{
  featuredBlogPosts: FeaturedBlogPostsProps['featuredBlogPosts'];
  featuredProjects: FeaturedProjectsProps['projects'];
}> {
  const getFeaturedBlogPosts = async () => {
    const memberSlugs = [
      'gerard-oneill',
      'kate-rodman',
      'joaquin-trinanes',
      'suan-chin',
      'david-van-beveren',
      'stephan-de-vries',
    ];

    const [unorderedMembers, [meetTheTeamTag]] = await Promise.all([
      getContents<ITeamMemberFields>({
        contentType: 'teamMember',
        query: {
          filters: {
            in: {
              slug: memberSlugs,
            },
          },
        },
      }),
      getContents<ITagFields>({
        contentType: 'tag',
        query: {
          slug: 'our-team',
        },
      }),
    ]);

    const members = sortByArray(
      unorderedMembers as ITeamMember[],
      memberSlugs,
      (member) => member.fields.slug,
    );

    const meetTheMembers = await getContents<IBlogEntryFields>({
      contentType: 'blogEntry',
      query: {
        'tags.sys.id': meetTheTeamTag.sys.id,
      },
      other: { select: ['fields.slug', 'fields.title'] },
    });

    return members
      .map((member) => ({
        member,
        blogEntry: meetTheMembers.find((blogEntry) =>
          blogEntry.fields.title.includes(member.fields.name.split(' ')[0]),
        ) as IBlogEntry,
      }))
      .filter(({ blogEntry }) => blogEntry);
  };

  const getFeaturedProjects = async () => {
    const intl = getServerIntl(defaultLocale);
    const projectDescriptions = getProjectDescriptions(intl);

    const projects = await getContents<IProjectFields>({
      contentType: 'project',
      query: {
        filters: {
          in: {
            name: Object.keys(projectDescriptions),
          },
        },
      },
    });

    const projectsSorted = sortByArray(
      projects,
      Object.keys(projectDescriptions),
      (project) => project.fields.name,
    );

    return projectsSorted.map((project) => project.fields);
  };

  const [featuredBlogPosts, featuredProjects] = await Promise.all([
    getFeaturedBlogPosts(),
    getFeaturedProjects(),
  ]);

  return {
    featuredBlogPosts,
    featuredProjects,
  };
}

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const intl = getServerIntl(locale);

  return {
    title: intl.formatMessage({
      id: 'page.year-in-review.2021.next-seo.title',
      defaultMessage: '2021 in Review',
    }),
  };
}

const YearInReview2021: React.FC<Props> = async ({ params: { locale } }) => {
  const intl = getServerIntl(locale);

  const { featuredBlogPosts, featuredProjects } = await loadContent();

  return (
    <>
      <div className='text-2xl'>
        <YearInReviewHeader
          year={2021}
          hero={
            <Hero
              imageBackground={heroBackground}
              tagline={{
                image: heroTagline,
                alt: intl.formatMessage({
                  id: 'page.year-in-review.2021.section.header.image.alt-text',
                  defaultMessage: '2021 year in review',
                }),
              }}
              alignment='left'
              classNameMapping={{
                container: 'bg-center',
                backgroundImage: 'object-[63%_50%]',
              }}
            />
          }
        />

        <Intro locale={locale} />
        <FeedbackAndTesting locale={locale} />
        <CommunityGrowth locale={locale} />
        <AnimatedVideos locale={locale} />
        <MinorChangesBigImpact locale={locale} />
        <DesignsForVeganOrgs locale={locale} />
        <FeaturedBlogPosts
          locale={locale}
          featuredBlogPosts={featuredBlogPosts}
        />
        <FeaturedProjects locale={locale} projects={featuredProjects} />
        <Rebrand
          locale={locale}
          kate={
            featuredBlogPosts.find(
              (post) => post.member.fields.name === 'Kate Rodman',
            ) as BlogPostItem
          }
        />
        <Partnerships locale={locale} />
        <NewsletterLaunch locale={locale} />
        <AdvisoryService locale={locale} />
        <ByTheNumbers locale={locale} />
        <Playground locale={locale} />
        <MovingForward locale={locale} />
      </div>
    </>
  );
};

export default YearInReview2021;
