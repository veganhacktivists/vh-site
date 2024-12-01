import { unstable_cache } from 'next/cache';

import OurWork from './_components/ourWork';
import FeaturedProjects from './_components/featuredProjects/featuredProjects';
import OtherProjects from './_components/otherProjects';
import DesignWork from './_components/designWork/designWork';
import HoursVolunteered from './_components/hoursVolunteered';
import KindWords from './_components/kindWords';
import OurCommunities from './_components/ourCommunities';
import GrantProgram from './_components/grantProgram';
import LikeWhatYouSee from './_components/likeWhatYouSee';
import ProvegIncubator from './_components/provegIncubator';

import StateOfData from 'app/[locale]/work/_components/stateOfData';
import Playground from 'app/[locale]/work/_components/playground';
import SharingKnowledgeAndSupport from 'app/[locale]/work/_components/sharingKnowledgeAndSupport';
import { getFeaturedProjects } from 'lib/cms/helpers';
import { getContents } from 'lib/cms';
import WorkHero from 'app/[locale]/work/_components/workHero';
import getServerIntl from 'app/intl';

import type { Metadata } from 'next';
import type { IProject, IProjectFields } from 'types/generated/contentful';

interface Props {
  params: { locale: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const intl = getServerIntl(params.locale);

  return {
    title: intl.formatMessage({
      id: 'page.work.next-seo.title',
      defaultMessage: 'Our Work',
    }),
  };
}

const getContent = unstable_cache(
  async () =>
    await Promise.all([
      getFeaturedProjects(),
      getContents<IProjectFields>({
        contentType: 'project',
        query: {
          isFeatured: false,
          filters: {
            ne: { showInWebsite: false },
            exists: { retiredInfo: false },
          },
        },
        other: {
          order: '-fields.date',
        },
      }) as Promise<IProject[]>,
    ]),
);

const Work = async ({ params: { locale } }: Props) => {
  const [featuredProjects, otherProjects] = await getContent();

  return (
    <>
      <WorkHero />

      <OurWork locale={locale} />

      <FeaturedProjects locale={locale} featuredProjects={featuredProjects} />

      <OtherProjects locale={locale} projects={otherProjects} />

      <DesignWork locale={locale} />

      <HoursVolunteered locale={locale} />

      <KindWords locale={locale} />

      <OurCommunities locale={locale} />

      <StateOfData locale={locale} />

      <GrantProgram locale={locale} />

      <ProvegIncubator locale={locale} />

      <Playground locale={locale} />

      <SharingKnowledgeAndSupport locale={locale} />

      <LikeWhatYouSee locale={locale} />
    </>
  );
};

export default Work;
