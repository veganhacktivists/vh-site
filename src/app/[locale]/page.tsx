import classNames from 'classnames';
import { unstable_cache } from 'next/cache';

import { DarkButton, LightButton } from '../../components/decoration/buttons';
import Circle from '../../components/decoration/circle';
import Hero from '../../components/decoration/hero';
import Sprite, { cow, goat } from '../../components/decoration/sprite';
import SquareField from '../../components/decoration/squares';
import { SectionHeader } from '../../components/decoration/textBlocks';
import YoutubeVideo from '../../components/decoration/youtubeVideo';
import FeaturedProject from '../../components/layout/index/featuredProject';
import LastBlogEntries from '../../components/layout/index/lastBlogEntries';
import JoinTheTeam from '../../components/layout/joinTheTeam';
import { pixelHeart } from '../../images/separators';
import { getBlogEntries, getFeaturedProjects } from '../../lib/cms/helpers';

import CustomImage from 'components/decoration/customImage';
import getServerIntl from 'app/intl';
import GrantsCallToAction from 'components/layout/grants/grantsCallToAction';

import type { IBlogEntry } from '../../types/generated/contentful';
import type { Metadata } from 'next';

import heroTagline from '~images/VH-hero-tagline.png';
import heroBackground from '~images/VH-hero-bg.jpg';

const HERO_DECORATION_SQUARES = [
  { color: 'green', size: 32, left: 0, bottom: 0 },
  { color: 'white', size: 16, left: 32, bottom: 0 },
  { color: 'magenta', size: 32, right: 0, bottom: 0 },
  { color: 'yellow', size: 32, left: 32, top: 0 },
  { color: 'yellow-orange', size: 16, left: 16, top: 32 },
  { color: 'red', size: 32, right: 32, top: 0 },
];

const PROJECT_DECORATION_SQUARES = [
  { color: 'gray-background', size: 16, left: 0, bottom: 0 },
  { color: 'grey', size: 16, left: 32, top: 0 },
  { color: 'gray-background', size: 16, right: 0, bottom: 0 },
  { color: 'grey', size: 16, right: 0, top: 0 },
];

const JOIN_DECORATION_SQUARES = [
  { color: 'gray', size: 32, left: 0, top: 0 },
  { color: 'gray-background', size: 16, left: 32, top: 0 },
  { color: 'gray-lighter', size: 16, left: 32, bottom: 0 },
];

const BLOG_DECORATION_SQUARES = [
  { color: 'white', size: 16, right: 0, bottom: 0 },
  { color: 'gray-lighter', size: 16, right: 0, top: 0 },
];

interface HomeProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: HomeProps): Promise<Metadata> {
  const intl = getServerIntl(locale);

  return await Promise.resolve({
    title: {
      default: intl.formatMessage({
        id: 'page.index.next-seo.title',
        defaultMessage: '<no-localization>Vegan Hacktivists</no-localization>',
      }),
      template: intl.formatMessage({
        id: 'page.index.next-seo.title-template',
        defaultMessage:
          '<no-localization>%s | Compassion, Creativity, Code!</no-localization>',
      }),
    },
  });
}

const loadProjectsAndBlogs = unstable_cache(async () => {
  return await Promise.all([getFeaturedProjects(), getBlogEntries(3)]);
});

const Home: React.FC<HomeProps> = async ({ params: { locale } }) => {
  const [featuredProjects, lastBlogEntries] = await loadProjectsAndBlogs();

  const intl = getServerIntl(locale);

  return (
    <>
      <Hero
        main
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: intl.formatMessage({
            id: 'page.index.section.stage.hero.alt',
            defaultMessage:
              '<no-localization>Compassion, Creativity, Code</no-localization>',
          }),
        }}
        alignment='right'
        classNameMapping={{
          container: 'bg-center',
        }}
      >
        <div className='relative mx-auto text-2xl text-white md:w-1/2'>
          {intl.formatMessage({
            id: 'page.index.section.stage.subline',
            defaultMessage:
              '<no-localization>Building for the animal protection movement since 2019</no-localization>',
          })}
        </div>
        <div className='relative mx-auto mt-10'>
          <LightButton href={`/${intl.locale}/about`}>
            {intl.formatMessage({
              id: 'page.index.section.stage.cta',
              defaultMessage: 'Learn More',
            })}
          </LightButton>
        </div>
      </Hero>
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <div className='content-center px-5 mx-auto my-24 text-2xl md:w-1/2'>
        <CustomImage
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt='Compassion, Creativity, Code'
        />
        <div className='mb-16 text-grey-dark'>
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.index.section.introduction.headline',
              defaultMessage:
                'We are <no-localization><b>VEGAN HACKTIVISTS</b></no-localization>',
            })}
          />
        </div>
        <p className='pb-5'>
          {intl.formatMessage(
            {
              id: 'page.index.section.introduction.paragraph.1',
              defaultMessage:
                'We are a global community of passionate animal advocates offering our skills in building technology for the animal protection movement through <b>design, development, and data</b>. As capacity builders, we deliver innovative and quality services at no cost to advocates and organizations.',
            },
            { b: (chunks) => <b>{chunks}</b> },
          )}
        </p>
        <p className='pb-5'>
          {intl.formatMessage(
            {
              id: 'page.index.section.introduction.paragraph.2',
              defaultMessage:
                'Our team is composed of highly-skilled and professional software engineers, designers, data scientists, and content creators. By leveraging our diverse background and skill sets, we design and build <b>data-driven projects</b> that aim to be effective and experimental.',
            },
            { b: (chunks) => <b>{chunks}</b> },
          )}
        </p>
        <p>
          {intl.formatMessage(
            {
              id: 'page.index.section.introduction.paragraph.3',
              defaultMessage:
                'Our <b>capacity-building services</b> are how we contribute to the movement. Leveraging our vast network of volunteers, we collaborate with individuals and organizations to offer web development, branding, and advisory services.',
            },
            { b: (chunks) => <b>{chunks}</b> },
          )}
        </p>
      </div>
      <Sprite image={cow} />
      <SquareField
        squares={[
          { left: 0, bottom: 0, color: 'gray' },
          { right: 0, top: 0, color: 'white' },
          { right: 16, top: 16, color: 'white' },
        ]}
        className='hidden md:block'
      />
      <div className='relative w-full overflow-hidden text-2xl text-white bg-gray'>
        <Circle
          xAlign='left'
          yAlign='bottom'
          color='grey-light'
          radius={25}
          opacity={0.1}
        />
        <Circle
          xAlign='right'
          yAlign='top'
          color='grey-dark'
          radius={50}
          opacity={0.6}
        />
        <div className='relative flex flex-col px-2 py-20 mx-auto md:w-1/2 gap-y-8'>
          <SectionHeader
            className='mb-2'
            header={intl.formatMessage({
              id: 'page.index.section.video.headline',
              defaultMessage: 'Watch our <b>intro video</b>',
            })}
          />
          <div className='py-2'>
            <YoutubeVideo id='jaW8n1pd97U' />
          </div>
          <div>
            {intl.formatMessage({
              id: 'page.index.section.video.subline',
              defaultMessage:
                'Watch our videos to learn more about us and our work:',
            })}
          </div>
          <div className='mx-auto w-fit'>
            <LightButton
              className=''
              href='https://www.youtube.com/c/VeganHacktivists'
            >
              {intl.formatMessage({
                id: 'page.index.section.video.cta',
                defaultMessage: 'Visit our channel',
              })}
            </LightButton>
          </div>
        </div>
      </div>
      <SquareField
        squares={PROJECT_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <div className='bg-grey-background'>
        <div className='content-center px-5 pt-16 mx-auto text-2xl md:w-1/2'>
          <div className='pb-5 text-grey-dark'>
            <SectionHeader
              header={intl.formatMessage({
                id: 'page.index.section.projects.headline',
                defaultMessage: 'Featured <b>PROJECTS</b>',
              })}
            />
          </div>
          <p>
            {intl.formatMessage(
              {
                id: 'page.index.section.projects.paragraph',
                defaultMessage:
                  'Every project we release is <b>100% free for everyone</b>. We believe in accessibility and transparency, and our projects reflect those values.',
              },
              {
                b: (chunks) => <b>{chunks}</b>,
              },
            )}
          </p>
          <div
            className={classNames(
              'grid grid-cols-2 gap-4 pt-16 sm:grid-cols-2',
              featuredProjects.length % 4 === 0
                ? 'md:grid-cols-4'
                : 'md:grid-cols-3',
            )}
          >
            {featuredProjects.map((project) => (
              <FeaturedProject key={project.sys.id} {...project.fields} />
            ))}
          </div>
          <div className='relative pb-16 mx-auto mt-10 md:w-1/3'>
            <DarkButton href={`/${intl.locale}/work`} className='font-mono'>
              {intl.formatMessage({
                id: 'page.index.section.projects.cta',
                defaultMessage: 'See Our Work',
              })}
            </DarkButton>
          </div>
        </div>
      </div>
      <SquareField
        squares={JOIN_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <JoinTheTeam locale={locale} />
      <SquareField
        squares={BLOG_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <LastBlogEntries
        entries={lastBlogEntries as IBlogEntry[]}
        locale={locale}
      />
      <SquareField
        squares={PROJECT_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <GrantsCallToAction locale={locale} />
      <Sprite image={goat} pixelsLeft={1} pixelsRight={0} />
    </>
  );
};

export default Home;
