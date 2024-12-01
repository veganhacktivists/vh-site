import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useSession } from 'next-auth/react';
import React from 'react';
import classNames from 'classnames';
import { UserRole } from '@prisma/client';
import { FormattedMessage, useIntl } from 'react-intl';

import heroFishImage from '../../../../public/images/playground/fishHero.png';
import heroCrabImage from '../../../../public/images/playground/crabHero.jpg';
import submitTagline from '../../../../public/images/playground/getsupport.svg';
import volunteerTagline from '../../../../public/images/playground/volunteer.svg';
import discord from '../../../../public/images/yearInReview/2021/discord.png';
import animalAdvocacyCareers from '../../../../public/images/playground/animal-advocacy-careers.png';
import SquareField from '../../decoration/squares';

import FaqSection from './faqSection';
import PlaygroundStats from './playgroundStats';

import CustomImage from 'components/decoration/customImage';
import Hero from 'components/decoration/hero';
import { DarkButton, OutlineButton } from 'components/decoration/buttons';
import { JOIN_PLAYGROUND_URL } from 'lib/discord/constants';
import YoutubeVideo from 'components/decoration/youtubeVideo';

import type { NextSeoProps } from 'next-seo';
import type { Layout } from 'types/persistentLayout';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'orange', size: 16, left: 0, top: 0 },
  { color: 'pink', size: 24, left: 16, bottom: 0 },
  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'yellow-orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const playgroundSEO: NextSeoProps = {
  titleTemplate: '%s | VH Playground',
  openGraph: {
    images: [
      {
        url: 'https://veganhacktivists.org/images/playground/VH_Playground_FullLogoWithBackground.png',
        alt: 'VH Playground logo',
        width: 1200,
        height: 630,
      },
    ],
  },
};

const PlaygroundLayout: Layout = ({ children }) => {
  const router = useRouter();
  const isSupportPage =
    router.pathname === '/playground' ||
    router.pathname === '/playground/submit';

  return (
    <>
      <NextSeo {...playgroundSEO} />
      <div>
        <Hero
          imageBackground={isSupportPage ? heroFishImage : heroCrabImage}
          tagline={{
            alt: isSupportPage
              ? 'Get Support from Playground'
              : 'Volunteer for the Animals',
            image: isSupportPage ? submitTagline : volunteerTagline,
            imageWidth: 380,
            biggerOnMobile: true,
          }}
          alignment='left'
          imageAlignment='right'
          classNameMapping={{
            container: 'bg-center',
            backgroundImage: 'object-[90%_0] md:object-center',
          }}
        />
        <SquareField
          squares={HERO_DECORATION_SQUARES}
          className='hidden md:block'
        />
      </div>
      {children}
      <div className='py-20 px-5 md:px-0'>
        <div className='flex flex-col sm:flex-row flex-grow md:w-2/3 2xl:w-1/2 mx-auto gap-10'>
          <div className='w-full sm:w-1/2 flex flex-grow'>
            <div className='relative w-full max-w-[500px]'>
              <SquareField
                squares={[
                  { color: 'orange-light', top: 0, right: 0, size: 10 },
                ]}
              />
              <div className='bg-yellow-orange p-10 2xl:p-20'>
                <CustomImage
                  alt='Animal Advocacy Careers'
                  src={animalAdvocacyCareers}
                  sizes='100vw'
                />
              </div>
            </div>
          </div>
          <div className='w-full sm:w-1/2'>
            <div className='text-left'>
              <span className='block text-3xl font-bold font-mono pb-5'>
                <FormattedMessage
                  id='page.playground.section.aac.headline'
                  defaultMessage='Looking for a job or career in animal advocacy?'
                />
              </span>
              <span className='block text-xl'>
                <FormattedMessage
                  id='page.playground.section.aac.content'
                  defaultMessage="Check out Animal Advocacy's job board which connects you to exciting animal nonprofit jobs with high potential for helping animals."
                />
              </span>
              <div className='flex mt-5'>
                <DarkButton href='https://www.animaladvocacycareers.org/?ref=veganhacktivists.org'>
                  <FormattedMessage
                    id='page.playground.section.aac.cta-button.label'
                    defaultMessage='Explore Careers'
                  />
                </DarkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FaqSection
        design={
          router.pathname === '/playground/submit'
            ? 'dark'
            : router.pathname === '/playground'
              ? undefined
              : 'light'
        }
      />
      <SquareField
        className='hidden md:block'
        squares={[
          { color: '#949494', size: 16, left: 0, top: 0 },
          { color: '#B6B6B6', size: 16, left: 16, top: 0 },
        ]}
      />
      <div className='relative w-full overflow-hidden text-2xl text-white bg-grey'>
        <div className='relative flex flex-col px-2 py-20 mx-auto md:w-1/2 gap-y-8'>
          <div className='py-2'>
            <YoutubeVideo id='yk5pwbtgmp4' />
          </div>
        </div>
      </div>
      <SquareField
        className='hidden md:block'
        squares={[
          { color: '#B3B3B3', size: 28, right: 0, bottom: 0 },
          { color: '#D9D9D9', size: 14, right: 28, bottom: 0 },
        ]}
      />
      <div
        className={classNames({
          dark: router.pathname === '/playground/request/[id]',
        })}
      >
        <div className='py-10 pt-5 pb-10 dark:bg-grey'>
          <div className='mt-10 mb-8 font-mono text-3xl font-bold capitalize text-grey'>
            <FormattedMessage
              id='page.playground.section.join-community.headline'
              defaultMessage='Volunteer? Join our community!'
            />
          </div>
          <div className='flex flex-col justify-center gap-5 mx-auto mb-8 md:flex-row md:w-2/3 lg:w-1/2'>
            <div
              className={classNames(
                'pt-8 pb-8 p-5 space-y-2 bg-grey-background',
              )}
            >
              <div className='w-32 mx-auto'>
                <CustomImage src={discord} alt='Discord logo' />
              </div>
              <div className='pt-4 pb-4 text-xl text-grey'>
                <FormattedMessage
                  id='page.playground.section.join-community.content'
                  defaultMessage='Are you a developer, designer, or have other skills to contribute for animals? Join our vegan volunteer Discord community and meet others in Playground!'
                />
              </div>
              <DarkButton newTab href={JOIN_PLAYGROUND_URL}>
                <FormattedMessage
                  id='page.playground.section.join-community.cta-button.label'
                  defaultMessage='Join us on Discord'
                />
              </DarkButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const PlaygroundLandingLayout: Layout = ({ children }) => {
  const router = useRouter();
  const showRequests = router.pathname === '/playground';
  const { data: session, status } = useSession();
  const intl = useIntl();

  return (
    <PlaygroundLayout>
      <div>
        <div className='py-2 mb-20 bg-grey-background'>
          <div className='grid justify-center mx-auto mt-8 md:mt-24 mb-8 md:mb-16 grid-cols-2 md:grid-cols-4 gap-y-5 w-fit text-gray'>
            <PlaygroundStats />
          </div>
          <div className='flex flex-col justify-center w-2/3 gap-8 mx-auto my-10 md:flex-row'>
            <OutlineButton
              capitalize={false}
              className='w-full uppercase'
              active={showRequests}
              href={`/${intl.locale}/playground`}
              linkProps={{ scroll: false }}
            >
              <FormattedMessage
                id='page.playground.section.navigation.view-requests.button.label'
                defaultMessage='View requests'
              />
            </OutlineButton>
            <OutlineButton
              capitalize={false}
              className='w-full uppercase'
              active={!showRequests}
              href={`/${intl.locale}/playground/submit`}
              linkProps={{ scroll: false }}
            >
              <FormattedMessage
                id='page.playground.section.navigation.submit-request.button.label'
                defaultMessage='Submit a request'
              />
            </OutlineButton>
            {status === 'authenticated' &&
              session.user?.role === UserRole.Admin && (
                <DarkButton
                  className='w-full uppercase'
                  href={'/playground/admin'}
                >
                  Admin
                </DarkButton>
              )}
          </div>
        </div>

        {children}
      </div>
    </PlaygroundLayout>
  );
};

export default PlaygroundLayout;
