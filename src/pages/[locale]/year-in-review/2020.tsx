import { NextSeo } from 'next-seo';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Hero from '../../../components/decoration/hero';
import heroBackground from '../../../../public/images/yearInReview/2020/VH-Hero-review.jpg';
import heroTagline from '../../../../public/images/yearInReview/2020/VH-Hero-text-review.png';
import SquareField from '../../../components/decoration/squares';
import Strawberry from '../../../../public/images/yearInReview/2020/icon-strawberry-outline.png';
import Blueberry from '../../../../public/images/yearInReview/2020/icon-blueberry-outline.png';
import petaLogo from '../../../../public/images/yearInReview/2020/peta.webp';
import beyondLogo from '../../../../public/images/yearInReview/2020/beyondanimal.webp';
import counterglowLogo from '../../../../public/images/yearInReview/2020/counterglow.webp';
import {
  FirstSubSection,
  SubSection,
} from '../../../components/decoration/textBlocks';
import { HighlightBlock } from '../../../components/layout/yearInReview/highlightBlock';
import { HighlightedProjects } from '../../../components/layout/yearInReview/highlightedProjects';
import { Organizations } from '../../../components/layout/yearInReview/organizations';
import { DarkButton } from '../../../components/decoration/buttons';
import Sprite, { cow } from '../../../components/decoration/sprite';
import TopPosts from '../../../components/layout/yearInReview/topPosts';
import { getContents } from '../../../lib/cms';
import YearInReviewHeader from '../../../components/layout/yearInReview/layout';
import CustomLink from '../../../components/decoration/link';
import AnimatedNumber from '../../../components/decoration/animatedNumber';
import { sortByArray } from '../../../lib/helpers/array';
import {
  pixelFlower,
  pixelHeart,
  pixelPig,
  pixelStar,
} from '../../../images/separators';

import CustomImage from 'components/decoration/customImage';

import type {
  IBlogEntry,
  IBlogEntryFields,
  IProject,
  IProjectFields,
} from '../../../types/generated/contentful';
import type { GetStaticProps } from 'next';

const STRATEGY_DECORATION_SQUARES = [
  { color: 'grey-background', size: 16, left: 0, bottom: 0 },
  { color: 'white', size: 16, left: 32, top: 0 },
];

const NEW_TEAM_SQUARES = [
  { color: 'grey', size: 16, left: 0, bottom: 0 },
  { color: 'grey-light', size: 16, left: 0, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
];

const MINOR_CHANGES_SQUARES = [
  { color: 'grey-background', size: 16, left: 0, top: 0 },
  { color: 'white', size: 16, right: 0, bottom: 0 },
  { color: 'grey-background', size: 16, right: 0, top: 0 },
];

const PROJECT_SQUARES = [
  { color: 'grey-dark', size: 16, left: 0, bottom: 0 },
  { color: 'grey-light', size: 16, left: 0, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
];

const ORGANIZATIONS_SQUARES = [
  { color: 'grey-background', size: 16, bottom: 0, left: 0 },
  { color: 'white', size: 16, top: 0, left: 32 },

  { color: 'grey-background', size: 16, bottom: 0, right: 0 },
  { color: 'white', size: 16, top: 0, right: 0 },
];

const FINAL_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'grey-background', size: 16, right: 0, top: 0 },
  { color: 'white', size: 16, right: 16, bottom: 0 },
];

export const getStaticProps: GetStaticProps = async () => {
  const slugs = [
    'covid-19-self-isolating-try-vegan',
    'why-a-global-pandemic-is-closely-tied-to-animal-agriculture',
    'the-problem-with-strays',
    'this-is-the-time-for-veganism-to-go-back-to-its-roots',
    'my-octopus-teacher-2020-step-into-nature-and-develop-a-gentleness',
    'dont-fall-for-clickbait-how-online-articles-misrepresent-veganism',
    'veganism-tour-around-the-world-what-does-veganism-look-like-in-other-countries',
    'eating-vegan-does-not-mean-losing-your-favorite-foods-only-changing-them',
  ];

  const topBlogs = await getContents<IBlogEntryFields>({
    contentType: 'blogEntry',
    query: {
      filters: {
        in: {
          slug: slugs,
        },
      },
    },
    other: { select: ['fields.slug', 'fields.title'] },
  });
  const orderedBlogEntries = sortByArray(
    topBlogs,
    slugs,
    (blog) => blog.fields.slug,
  );

  const projectNames = [
    'Vegan Bootcamp',
    'Animal Rights Map',
    'Daily Nooch',
    'My Daily Dozen',
  ];

  const projects = await getContents<IProjectFields>({
    contentType: 'project',
    query: {
      filters: {
        in: {
          name: projectNames,
        },
      },
    },
  });

  return {
    props: {
      topBlogs: orderedBlogEntries,
      projects: sortByArray(
        projects,
        projectNames,
        (project) => project.fields.name,
      ),
    },
  };
};

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

interface YearInReviewProps {
  topBlogs: IBlogEntry[];
  projects: IProject[];
}

const YearInReview2020: React.FC<YearInReviewProps> = ({
  topBlogs,
  projects,
}) => {
  const intl = useIntl();
  const PROJECTS_DESCRIPTION: Record<string, React.ReactNode> = {
    'Vegan Bootcamp': intl.formatMessage({
      id: 'page.year-in-review.2020.section.highlighted-projects.vegan-bootcamp.paragraph',
      defaultMessage:
        "Following the success of <no-localization>Vegan Bootcamp's</no-localization> launch in 2019 with over 5000+ signups, we decided to invest more time in improving it. We sent out a survey to all members and received a large amount of feedback helping us decide what new content and features were needed. <no-localization>Vegan Bootcamp</no-localization> now includes community forums, individual courses, tags, better rewards, advanced statistics for referrals, content search, a vegan dietitian support program, a mentorship support program, and it now comes translated in 10 different languages!",
    }),
    'Animal Rights Map': intl.formatMessage({
      id: 'page.year-in-review.2020.section.highlighted-projects.animal-rights-map.paragraph',
      defaultMessage:
        "With over 2,500 groups, the <no-localization>Animal Rights Map</no-localization> is a globally updated map that helps vegans find local groups to get active with. Our map includes everyone from the largest organizations to the very small grassroots groups spread around the country. We worked with a few organizations to import new groups automatically, and we have a dedicated volunteer (that started this project) who meticulously updates the map almost every day. We've received a lot of great feedback for the map from vegans who were looking to get active - we plan on gathering more data soon and expanding the features of this map for 2021!",
    }),
    'Daily Nooch': intl.formatMessage({
      id: 'page.year-in-review.2020.section.highlighted-projects.daily-nooch.paragraph',
      defaultMessage:
        "With this project we wanted to create something a little more fun and light-weight that vegans could enjoy consuming and sharing with the world. <no-localization>Daily Nooch</no-localization> is your one-stop source for daily vegan news, resources and inspiration. Designed to be your homepage, get the latest news, quotes, art, memes, facts, videos, and more updated every day at midnight. This project is very experimental and we don't know if vegans will use this consistently, but in the meantime the team had a lot of fun building it. If folks like it we have a bunch of fun ideas to explore that will add more interactivity to the project.",
    }),
    'My Daily Dozen': intl.formatMessage({
      id: 'page.year-in-review.2020.section.highlighted-projects.my-daily-dozen.paragraph',
      defaultMessage:
        '<no-localization>Dr. Greger</no-localization>, founder of <no-localization>NutritionFacts.org</no-localization>, created an app called <no-localization>"Daily Dozen"</no-localization> that allows you to track your diet and make sure you get the best nutrition possible - and details the healthiest foods and how many servings of each we should try to check off every day. We wanted to expand on this concept and create a web-based version of his app with some additional features. Use My <no-localization>Daily Dozen</no-localization> to keep daily track of the foods recommended by <no-localization>Dr. Greger</no-localization> in his <no-localization>New York Times</no-localization> Bestselling book, <no-localization>How Not to Die</no-localization>. We hope that this project will give non-vegans the opportunity for an easier path to veganism by adopting a plant-based lifestyle.',
    }),
  };
  return (
    <>
      <NextSeo title='2020 in Review' />
      <YearInReviewHeader
        year={2020}
        hero={
          <Hero
            imageBackground={heroBackground}
            tagline={{
              image: heroTagline,
              alt: intl.formatMessage({
                id: 'page.year-in-review.2020.section.header.image.alt-text',
                defaultMessage: '2020 year in review',
              }),
            }}
            alignment='left'
            classNameMapping={{
              container: 'bg-center',
              backgroundImage: 'object-[80%_40%]',
            }}
          />
        }
      />
      <CustomImage
        src={pixelHeart.src}
        height={pixelHeart.height / 3}
        width={pixelHeart.width / 3}
        alt=''
      />
      <SubSection
        header={intl.formatMessage({
          id: 'page.year-in-review.2020.section.we-grew.heading',
          defaultMessage: 'We grew a lot as a community',
        })}
        headerSize='3xl'
        contentSize='2xl'
      >
        <FormattedMessage
          id='page.year-in-review.2020.section.we-grew.intro'
          defaultMessage="This year, we worked with some amazing vegan organizations, helped a lot of people with their advocacy, and had a blast building interesting projects for the movement. Our team almost grew three fold and there were a lot of new challenges that came with that growth, but we're really happy with what we accomplished and we can't wait to see what 2021 brings for us!"
        />
      </SubSection>
      <div className='h-12' />
      <HighlightBlock
        borderColor='magenta'
        headerStart='WE LAUNCHED'
        headerBold='EIGHT PROJECTS'
        headerEnd='FOR THE MOVEMENT'
      >
        <FormattedMessage
          id='page.year-in-review.2020.section.we-grew.launched.content'
          defaultMessage='Four of which were unique project ideas of our own! We were also lucky enough to work on projects with <no-localization>Animal Rebellion</no-localization>, <no-localization>Animal Save Movement</no-localization>, <no-localization>Lebanese Vegans</no-localization>, and the <no-localization>Excelsior 4</no-localization>!'
        />
      </HighlightBlock>
      <HighlightBlock
        borderColor='yellow'
        headerStart='WE EXPANDED OUR TEAM FROM'
        headerBold='28 TO 80 VOLUNTEERS'
      >
        <FormattedMessage
          id='page.year-in-review.2020.section.we-grew.expanded.content'
          defaultMessage='We expanded from just 3 teams of 28 volunteers to 7 teams of 80 volunteers! We were able to open up more positions including content creators, animators, social, marketing, and advertising!'
        />
      </HighlightBlock>
      <HighlightBlock
        borderColor='green'
        headerStart='WE NOW HAVE AN'
        headerBold='ADVISORY TEAM'
        headerEnd='OF VEGAN EXPERTS'
      >
        <FormattedMessage
          id='page.year-in-review.2020.section.we-grew.advisory-team.content'
          defaultMessage="We're incredibly thankful to now have a team of experienced vegan advisors to lean on such as <no-localization>Seb Alex</no-localization>, <no-localization>Ryuji Chua</no-localization>, <no-localization>Leah Doellinger</no-localization> and <no-localization>Michael Dearborn</no-localization>. Browse more of our advisors, <link>click here!</link>"
          values={{
            link: (chunks) => (
              <CustomLink href={`/${intl.locale}/people/advisors`}>
                {chunks}
              </CustomLink>
            ),
          }}
        />
      </HighlightBlock>
      <div className='h-16' />
      <SquareField
        squares={STRATEGY_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <div className='py-8 bg-gray-background'>
        <CustomImage
          src={pixelFlower.src}
          height={pixelFlower.height / 3}
          width={pixelFlower.width / 3}
          alt=''
        />
        <SubSection
          header={intl.formatMessage({
            id: 'page.year-in-review.2020.section.strategy-and-experimentation.heading',
            defaultMessage: 'Strategy and experimentation',
          })}
          headerSize='3xl'
          contentSize='2xl'
          spacing={4}
        >
          <FormattedMessage
            id='page.year-in-review.2020.section.strategy-and-experimentation.paragraph.0'
            defaultMessage='Like 2019, we focused on building projects with little data on whether those projects would succeed. We consider this a high-risk strategy as we use hundreds of hours volunteer time on these experimental projects.'
          />
        </SubSection>
        <SubSection contentSize='2xl'>
          <FormattedMessage
            id='page.year-in-review.2020.section.strategy-and-experimentation.paragraph.1'
            defaultMessage="We're thankful this worked last year as 3 of the 6 projects we built met our standards of success, so we continued with this methodology. We firmly believe it's important for any movement to innovate, try new tactics, build experimental tools, and strategize alternatively."
          />
        </SubSection>
      </div>
      <SquareField
        squares={[{ color: 'grey-light', size: 16, bottom: 0, right: 0 }]}
        className='hidden md:block'
      />
      <div className='py-16 bg-grey-dark'>
        <h1 className='mx-auto mb-16 font-mono text-6xl text-white'>
          <FormattedMessage
            id='page.year-in-review.2020.section.community-building.heading'
            defaultMessage='COMMUNITY BUILDING'
          />
        </h1>
        <div className='w-2/3 mx-auto'>
          <div className='flex flex-col md:flex-row md:gap-x-16'>
            <div className='flex-1'>
              <CustomImage
                src={pixelStar.src}
                height={pixelStar.height / 3}
                width={pixelStar.width / 3}
                alt=''
              />
              <SubSection
                header={intl.formatMessage({
                  id: 'page.year-in-review.2020.section.community-building.volunteers.heading',
                  defaultMessage: 'Volunteers',
                })}
                headerSize='3xl'
                contentSize='2xl'
                textColor='white'
              >
                <FormattedMessage
                  id='page.year-in-review.2020.section.community-building.volunteers.paragraph'
                  defaultMessage='This year we attracted volunteers that worked for <no-localization>Trello</no-localization>, <no-localization>Microsoft</no-localization>, <no-localization>Etsy</no-localization>, <no-localization>Better Eating</no-localization>, <no-localization>Mercy for Animals</no-localization>, <no-localization>Save Movement</no-localization> and <no-localization>Paypal</no-localization>!'
                />
              </SubSection>
            </div>
            <div className='flex-1'>
              <CustomImage
                src={pixelHeart.src}
                height={pixelHeart.height / 3}
                width={pixelHeart.width / 3}
                alt=''
              />
              <SubSection
                header={intl.formatMessage({
                  id: 'page.year-in-review.2020.section.community-building.our-values.heading',
                  defaultMessage: 'Our Values',
                })}
                headerSize='3xl'
                contentSize='2xl'
                textColor='white'
              >
                <FormattedMessage
                  id='page.year-in-review.2020.section.community-building.our-values.paragraph'
                  defaultMessage='We came together as a community and decided on what values we wanted to adopt, and to formalize what our mission and goals were.'
                />
              </SubSection>
            </div>
          </div>
          <SubSection
            header={intl.formatMessage({
              id: 'page.year-in-review.2020.section.community-building.partnerships.heading',
              defaultMessage: 'Partnerships',
            })}
            headerSize='3xl'
            contentSize='2xl'
            textColor='white'
          >
            <FormattedMessage
              id='page.year-in-review.2020.section.community-building.partnerships.paragraph'
              defaultMessage="This year we're extremely happy to have partnered with <no-localization>PETA</no-localization>, <no-localization>Beyond Animal</no-localization>, and <no-localization>Project Counterglow</no-localization>. These three partners have elevated us this year and we're so grateful to have the ability to both serve them and rely on them as our new friends."
            />
          </SubSection>
          <div className='grid justify-center grid-cols-1 md:grid-cols-3'>
            <CustomImage src={petaLogo} alt='peta logo' />
            <CustomImage src={beyondLogo} alt='beyond animal logo' />
            <CustomImage src={counterglowLogo} alt='counterglow logo' />
          </div>
        </div>
      </div>
      <SquareField squares={NEW_TEAM_SQUARES} className='hidden md:block' />
      <div className='py-16 bg-grey-background'>
        <h2 className='flex flex-col justify-center mx-auto text-3xl'>
          <div className='mx-auto w-36'>
            <CustomImage
              className='drop-shadow-xl'
              src={Strawberry}
              alt=''
              sizes='100vw'
            />
          </div>
          <div className='px-5 mb-5'>
            <FormattedMessage
              id='page.year-in-review.2020.section.new-teams.strawberry.heading'
              defaultMessage='<span>Data Analytics</span> | Team Strawberry'
              values={{
                span: (chunks) => <span className='font-bold'>{chunks}</span>,
              }}
            />
          </div>
        </h2>
        <SubSection headerSize='3xl' contentSize='2xl' spacing={4}>
          <FormattedMessage
            id='page.year-in-review.2020.section.new-teams.strawberry.paragraph.0'
            defaultMessage="We've <link>started up a new team</link> dedicated to collecting and analyzing data not only on the projects that we build, but <no-localization>Vegan Hacktivists</no-localization> as an organization. This team marks our commitment to data, a commitment to making sure that everything we do makes a big impact, and that we're able to learn from our work in the past, as well as shaping the work we do in the future."
            values={{
              link: (chunks) => (
                <CustomLink
                  href={`/${intl.locale}/blog/were-assembling-a-data-and-analytics-team`}
                >
                  {chunks}
                </CustomLink>
              ),
            }}
          />
        </SubSection>
        <SubSection headerSize='3xl' contentSize='2xl' spacing={4}>
          <FormattedMessage
            id='page.year-in-review.2020.section.new-teams.strawberry.paragraph.1'
            defaultMessage="<no-localization>Suan Chin</no-localization> is leading this team with 7 other data scientists. See the entire team by visiting the <link>team page here</link>. We're excited to see how this team will shape the future of the work we do!"
            values={{
              link: (chunks) => (
                <CustomLink href={`/${intl.locale}/people/team`}>
                  {chunks}
                </CustomLink>
              ),
            }}
          />
        </SubSection>
        <h2 className='flex flex-col justify-center mx-auto text-3xl'>
          <div className='mx-auto w-36'>
            <CustomImage
              src={Blueberry}
              alt=''
              className='drop-shadow-xl'
              sizes='100vw'
            />
          </div>
          <div className='px-5 mb-5'>
            <FormattedMessage
              id='page.year-in-review.2020.section.new-teams.blueberry.heading'
              defaultMessage='<span>Specialists</span> | Team Blueberry'
              values={{
                span: (chunks) => <span className='font-bold'>{chunks}</span>,
              }}
            />
          </div>
        </h2>
        <SubSection headerSize='3xl' contentSize='2xl'>
          <FormattedMessage
            id='page.year-in-review.2020.section.new-teams.blueberry.paragraph'
            defaultMessage='We recently introduced the Specialists team! 9 new activists have joined the team and each one currently fulfilling the roles of: Release, DevOps, Security, <no-localization>SEO</no-localization>, <no-localization>CSS</no-localization>, Art, Maps, Video, and Audio. This filled a gap where our team members could specifically get issues addressed on their projects through Team Blueberry.'
          />
        </SubSection>
      </div>
      <SquareField
        squares={MINOR_CHANGES_SQUARES}
        className='hidden md:block'
      />
      <div className='py-16 -mt-7'>
        <FirstSubSection
          header={intl.formatMessage({
            id: 'page.year-in-review.2020.section.big-impact-changes.heading',
            defaultMessage: 'Minor changes with a <b>BIG IMPACT</b>',
          })}
        />
        <div className='mx-auto space-y-6 text-2xl text-left md:w-max'>
          {[
            {
              icon: <>&#127815;</>,
              description: (
                <FormattedMessage
                  id='page.year-in-review.2020.section.big-impact-changes.grape.paragraph'
                  defaultMessage='We integrated <no-localization>Google Analytics</no-localization> into all of our projects.'
                />
              ),
            },
            {
              icon: <>&#127817;</>,
              description: (
                <FormattedMessage
                  id='page.year-in-review.2020.section.big-impact-changes.watermelon.paragraph'
                  defaultMessage='We started accepting applications from <no-localization>Python</no-localization> developers.'
                />
              ),
            },
            {
              icon: <>&#127818;</>,
              description: (
                <FormattedMessage
                  id='page.year-in-review.2020.section.big-impact-changes.orange.paragraph'
                  defaultMessage='We published our anonymous volunteer feedback form.'
                />
              ),
            },
            {
              icon: <> &#127820;</>,
              description: (
                <FormattedMessage
                  id='page.year-in-review.2020.section.big-impact-changes.banana.paragraph'
                  defaultMessage='We launched our <no-localization>LinkedIn</no-localization> page for our volunteers.'
                />
              ),
            },
            {
              icon: <>&#127822;</>,
              description: (
                <FormattedMessage
                  id='page.year-in-review.2020.section.big-impact-changes.apple.paragraph'
                  defaultMessage='We enabled bot notifications for community events & actions.'
                />
              ),
            },
            {
              icon: <>&#129373;</>,
              description: (
                <FormattedMessage
                  id='page.year-in-review.2020.section.big-impact-changes.kiwi.paragraph'
                  defaultMessage='We released and open-sourced several of our past projects.'
                />
              ),
            },
            {
              icon: <>&#129365;</>,
              description: (
                <FormattedMessage
                  id='page.year-in-review.2020.section.big-impact-changes.carrot.paragraph'
                  defaultMessage='We improved our on-boarding process and developer guides.'
                />
              ),
            },
            {
              icon: <>&#127827;</>,
              description: (
                <FormattedMessage
                  id='page.year-in-review.2020.section.big-impact-changes.strawberry.paragraph'
                  defaultMessage='We installed advanced server monitoring software.'
                />
              ),
            },
          ].map(({ icon, description }, i) => (
            <div
              key={i}
              className='flex flex-col justify-start w-full md:flex-row gap-x-5'
            >
              <div className='mx-auto text-5xl md:mx-0 md:text-2xl'>{icon}</div>
              <div className='mx-auto text-center md:mx-0 md:text-left'>
                {description}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SquareField
        squares={[{ color: 'grey-light', size: 16, right: 0, bottom: 0 }]}
      />
      <div className='py-24 uppercase bg-black'>
        <div className='w-5/6 mx-auto space-y-8 md:w-2/3'>
          <h1 className='font-mono text-6xl text-white'>
            <FormattedMessage
              id='page.year-in-review.2020.section.by-the-numbers.heading'
              defaultMessage='By the numbers'
            />
          </h1>
          <h2 className='p-6 font-mono text-4xl font-bold text-left text-white bg-grey-dark'>
            <FormattedMessage
              id='page.year-in-review.2020.section.by-the-numbers.2020-traffic.heading'
              defaultMessage='OUR 2020 TRAFFIC'
            />
          </h2>
          <div className='flex flex-col md:flex-row gap-x-5'>
            <div className='flex-1 text-left'>
              <h1 className='font-mono font-bold text-magenta'>
                <AnimatedNumber number={318000} approx />
              </h1>
              <p className='w-2/3 font-mono text-3xl font-bold text-white'>
                <FormattedMessage
                  id='page.year-in-review.2020.section.by-the-numbers.2020-traffic.unique-visitors'
                  defaultMessage='UNIQUE VISITORS'
                />
              </p>
            </div>
            <div className='flex-1 text-left'>
              <h1 className='font-mono font-bold text-magenta'>
                <AnimatedNumber number={1710000} approx />
              </h1>
              <p className='w-2/3 font-mono text-3xl font-bold text-white'>
                <FormattedMessage
                  id='page.year-in-review.2020.section.by-the-numbers.2020-traffic.unique-page-views'
                  defaultMessage='UNIQUE PAGE VIEWS'
                />
              </p>
            </div>
          </div>
          <h2 className='p-6 font-mono text-4xl font-bold text-left text-white bg-grey-dark'>
            <FormattedMessage
              id='page.year-in-review.2020.section.by-the-numbers.project-statistics.heading'
              defaultMessage='PROJECT STATISTICS'
            />
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-16'>
            <div className='flex-1 text-left'>
              <h1 className='font-mono font-bold text-green'>
                <AnimatedNumber number={734} approx />
              </h1>
              <p className='w-2/3 mb-10 font-mono text-3xl text-white'>
                <FormattedMessage
                  id='page.year-in-review.2020.section.by-the-numbers.project-statistics.courses-done'
                  defaultMessage='COURSES DONE ON <span><no-localization>VEGANBOOTCAMP.ORG</no-localization></span> IN UNDER 60 DAYS'
                  values={{
                    span: (chunks) => (
                      <span className='font-bold'>{chunks}</span>
                    ),
                  }}
                />
              </p>
            </div>
            <div className='flex-1 text-left'>
              <h1 className='font-mono font-bold text-green'>
                <AnimatedNumber number={8854} approx />
              </h1>
              <p className='w-2/3 mb-10 font-mono text-3xl text-white'>
                <FormattedMessage
                  id='page.year-in-review.2020.section.by-the-numbers.project-statistics.tweets'
                  defaultMessage='TWEETS BY OUR <span><no-localization>5 MINUTES 5 VEGANS</no-localization></span> SUPPORT BOT'
                  values={{
                    span: (chunks) => (
                      <span className='font-bold'>{chunks}</span>
                    ),
                  }}
                />
              </p>
            </div>
            <div className='flex-1 text-left'>
              <h1 className='font-mono font-bold text-green'>
                <AnimatedNumber number={2528} approx />
              </h1>
              <p className='w-2/3 font-mono text-3xl text-white'>
                <FormattedMessage
                  id='page.year-in-review.2020.section.by-the-numbers.project-statistics.groups-added'
                  defaultMessage='ANIMAL RIGHTS GROUPS ADDED TO <span><no-localization>ANIMALRIGHTSMAP.ORG</no-localization></span>'
                  values={{
                    span: (chunks) => (
                      <span className='font-bold'>{chunks}</span>
                    ),
                  }}
                />
              </p>
            </div>
            <div className='flex-1 text-left'>
              <h1 className='font-mono font-bold text-green'>
                <AnimatedNumber number={46562} approx />
              </h1>
              <p className='w-2/3 font-mono text-3xl text-white'>
                <FormattedMessage
                  id='page.year-in-review.2020.section.by-the-numbers.project-statistics.clicks'
                  defaultMessage='CLICKS DIRECTING ACTIVISTS TO ORGS <span><no-localization>VEGANACTIVISM.ORG</no-localization></span>'
                  values={{
                    span: (chunks) => (
                      <span className='font-bold'>{chunks}</span>
                    ),
                  }}
                />
              </p>
            </div>
          </div>
          <h2 className='p-6 font-mono text-4xl font-bold text-left text-white bg-grey-dark'>
            <FormattedMessage
              id='page.year-in-review.2020.section.by-the-numbers.on-the-blog.heading'
              defaultMessage='ON THE BLOG'
            />
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-8 md:gap-y-0'>
            <div className='flex flex-col flex-1'>
              <div className='flex-1 text-left'>
                <h1 className='font-mono font-bold text-yellow'>
                  <AnimatedNumber number={24} />
                </h1>
                <p className='w-2/3 mb-10 font-mono text-3xl text-white'>
                  <FormattedMessage
                    id='page.year-in-review.2020.section.by-the-numbers.on-the-blog.new-posts'
                    defaultMessage='<b>NEW POSTS</b> FROM THE CONTENT TEAM'
                    values={{
                      b: (chunks) => <b>{chunks}</b>,
                    }}
                  />
                </p>
              </div>
              <div className='flex-1 mb-8 text-left'>
                <h1 className='font-mono font-bold text-yellow'>
                  <AnimatedNumber number={13926} approx />
                </h1>
                <p className='w-2/3 font-mono text-3xl text-white'>
                  <FormattedMessage
                    id='page.year-in-review.2020.section.by-the-numbers.on-the-blog.page-views'
                    defaultMessage='UNIQUE <b>PAGE VIEWS</b> ON THE BLOG'
                    values={{
                      b: (chunks) => <b>{chunks}</b>,
                    }}
                  />
                </p>
              </div>
            </div>
            <div className='flex flex-col text-left md:flex-1'>
              <TopPosts topPosts={topBlogs.map((entry) => entry.fields)} />
            </div>
          </div>
        </div>
      </div>
      <SquareField squares={PROJECT_SQUARES} className='hidden md:block' />
      <FirstSubSection
        header={intl.formatMessage({
          id: 'page.year-in-review.2020.section.highlighted-projects.heading',
          defaultMessage: 'See our <b>HIGHLIGHTED PROJECTS</b>',
        })}
      />
      <HighlightedProjects
        darkBackground
        projects={projects.map((project) => ({
          ...project.fields,
          customDescription: PROJECTS_DESCRIPTION[project.fields.name],
        }))}
      />
      <SquareField
        squares={ORGANIZATIONS_SQUARES}
        className='hidden md:block'
      />
      <Organizations />
      <SquareField squares={FINAL_SQUARES} className='hidden md:block' />
      <div className='h-16' />
      <CustomImage
        src={pixelPig.src}
        height={pixelPig.height / 3}
        width={pixelPig.width / 3}
        alt='Pixel heart'
      />
      <SubSection
        header={intl.formatMessage({
          id: 'page.year-in-review.2020.section.moving-forward.heading',
          defaultMessage: 'Finishing up and moving forward!',
        })}
        headerSize='3xl'
        contentSize='2xl'
        spacing={4}
      >
        <FormattedMessage
          id='page.year-in-review.2020.section.moving-forward.paragraph.0'
          defaultMessage="While we're happy with this years results as-well, we recognize the need to take a more data-based approach in what we build if we are to utilize our network of amazing volunteers effectively."
        />
      </SubSection>
      <SubSection contentSize='2xl' spacing={4}>
        <FormattedMessage
          id='page.year-in-review.2020.section.moving-forward.paragraph.1'
          defaultMessage='We also recognize that innovation often comes in uncharted territories where data is often lacking - so for 2021 we want to find a good balance of choosing projects that align with our innovation approach, while utilizing data to pick which ones may have the greater chance of impact in our movement.'
        />
      </SubSection>

      <SubSection contentSize='2xl' spacing={4}>
        <FormattedMessage
          id='page.year-in-review.2020.section.moving-forward.paragraph.2'
          defaultMessage="We're really excited to hear your thoughts on our 2020 year in review, and if you like what we do, please consider supporting us by clicking the button below. Your donation ensures that all of our work and projects remain free and accessible to everyone, and we can't begin to thank you enough for the support!"
        />
      </SubSection>
      <div className='flex justify-center my-16 mb-36'>
        <DarkButton href={`/${intl.locale}/support`}>
          <FormattedMessage
            id='page.year-in-review.2020.section.moving-forward.btn.text'
            defaultMessage='Support our work!'
          />
        </DarkButton>
      </div>
      <Sprite image={cow} />
    </>
  );
};

export default YearInReview2020;
