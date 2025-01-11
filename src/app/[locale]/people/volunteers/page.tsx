import React from 'react';
import { unstable_cache } from 'next/cache';

import { FirstSubSection } from '../../../../components/decoration/textBlocks';
import { getContents } from '../../../../lib/cms';
import SquareField from '../../../../components/decoration/squares';
import { getActiveTeams } from '../../../../lib/cms/helpers';
import { pixelHeart } from '../../../../images/separators';

import VolunteersSection from './_components/volunteersSection';

import CustomImage from 'components/decoration/customImage';
import getServerIntl from 'app/intl';

import type { ITeamMember } from '../../../../types/generated/contentful';
import type { ITeamMemberFields } from '../../../../types/generated/contentful';
import type { ITeam } from '../../../../types/generated/contentful';
import type { Metadata } from 'next';

const getTeamsAndTeamMembersCached = unstable_cache(async () => {
  const teamMembers = (await getContents<ITeamMemberFields>({
    contentType: 'teamMember',
    query: {
      isCoreMember: false,
      type: 'team',
      filters: {
        exists: {
          team: true,
        },
        ne: {
          isInactive: true,
        },
      },
    },
    other: { order: 'fields.isTeamLeader' },
  })) as ITeamMember[];

  const activeTeamSlugs = new Set();
  teamMembers.forEach((teamMember) => {
    activeTeamSlugs.add(teamMember.fields.team?.fields.slug);
  });

  const teams = (await getActiveTeams()).filter((entry) => {
    return activeTeamSlugs.has(entry.fields.slug);
  }) as ITeam[];

  return { teams, teamMembers };
});

const TEAM_SQUARES = [
  { color: 'grey-light', size: 16, left: 0, bottom: 0 },
  { color: 'grey-lighter', size: 16, left: 16, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
  { color: 'white', size: 16, right: 0, top: 0 },
];

interface Props {
  params: {
    locale: string;
  };
}

export function generateMetadata({ params }: Props): Metadata {
  const intl = getServerIntl(params.locale);

  return {
    title: intl.formatMessage({
      id: 'page.people.section.volunteers.next-seo.title',
      defaultMessage: 'Our Volunteers',
    }),
  };
}

const Team: React.FC<Props> = async ({ params: { locale } }) => {
  const intl = getServerIntl(locale);

  const { teams, teamMembers } = await getTeamsAndTeamMembersCached();

  return (
    <>
      <FirstSubSection
        header={intl.formatMessage({
          id: 'page.people.section.volunteers.intro.heading',
          defaultMessage: 'Our <b>volunteers</b>',
        })}
      >
        {intl.formatMessage(
          {
            id: 'page.people.section.volunteers.intro.paragraph',
            defaultMessage:
              'Our volunteer community is at the heart of our organization, and enables us to build innovative projects and contribute to the movement in meaningful ways. <b>Click on an icon to meet the volunteers in each team!</b>',
          },
          { b: (chunks) => <b>{chunks}</b> },
        )}
      </FirstSubSection>
      <VolunteersSection teams={teams} teamMembers={teamMembers} />
      <SquareField squares={TEAM_SQUARES} className='hidden md:block' />
      <div className='px-10 pt-16 pb-10 bg-gray-background'>
        <CustomImage
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt={intl.formatMessage({
            id: 'page.people.section.volunteers.community.image.alt-text',
            defaultMessage: 'Our community',
          })}
        />
        <FirstSubSection
          header={intl.formatMessage({
            id: 'page.people.section.volunteers.community.heading',
            defaultMessage: 'Our <b>community</b>',
          })}
        >
          {intl.formatMessage({
            id: 'page.people.section.volunteers.community.paragraph',
            defaultMessage:
              'We are more than a group of volunteers; we are a community tethered by shared values and invested in a vision of a better world for animals. We believe in a community-first approach: one that is supportive, growth-oriented, and accountable to each other. If this resonates with you, scroll down to learn more.',
          })}
        </FirstSubSection>
      </div>
    </>
  );
};

export default Team;
