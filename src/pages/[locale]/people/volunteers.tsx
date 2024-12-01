import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import PeopleLayout from '../../../components/layout/people';
import { FirstSubSection } from '../../../components/decoration/textBlocks';
import { WhiteButton } from '../../../components/decoration/buttons';
import { getContents } from '../../../lib/cms';
import SquareField from '../../../components/decoration/squares';
import { getActiveTeams } from '../../../lib/cms/helpers';
import ContentfulImage from '../../../components/layout/contentfulImage';
import { useHash } from '../../../hooks/useHash';
import shuffle from '../../../lib/helpers/shuffle';
import useViewMore from '../../../hooks/useViewMore';
import SocialLinks from '../../../components/layout/team/socialLinks';
import { pixelHeart } from '../../../images/separators';
import { useTeamStore } from '../../../lib/stores/teamStore';

import CustomImage from 'components/decoration/customImage';

import type PageWithLayout from '../../../types/persistentLayout';
import type { ITeamMember } from '../../../types/generated/contentful';
import type { ITeamMemberFields } from '../../../types/generated/contentful';
import type { ITeam } from '../../../types/generated/contentful';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const teamMembers = await getContents<ITeamMemberFields>({
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
  });

  const activeTeamSlugs = new Set();
  teamMembers.forEach((teamMember) => {
    activeTeamSlugs.add(teamMember.fields.team?.fields.slug);
  });

  const teams = (await getActiveTeams()).filter((entry) => {
    return activeTeamSlugs.has(entry.fields.slug);
  });

  return {
    props: { teams, teamMembers },
    revalidate: 480,
  };
};

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

const TeamMemberCard: React.FC<{ member: ITeamMember; teamColor: string }> = ({
  member,
  teamColor,
}) => {
  const { name, team, position, image, isTeamLeader, socialLinks } =
    member.fields;
  const { name: teamName } = team!.fields;

  return (
    <div className='w-64'>
      <div className='flex justify-end h-64 mb-2 bg-grey w-100 group'>
        {image && (
          <div className='relative w-full filter grayscale group-hover:grayscale-0'>
            <ContentfulImage
              downloadwidth={500}
              image={image}
              alt={name}
              priority={isTeamLeader}
            />
            <div
              className={
                'left-0 top-0 w-full h-full absolute opacity-0 group-hover:opacity-10'
              }
              style={{
                backgroundColor: teamColor,
              }}
            />
          </div>
        )}
        <div
          style={{ backgroundColor: teamColor }}
          className={'absolute w-8 h-8'}
        />
      </div>
      <div className='font-bold'>{name}</div>
      <div>
        <span className='mx-1'>{position}</span>
        <div style={{ color: teamColor }} className='font-bold uppercase'>
          {teamName}
        </div>
      </div>
      {socialLinks && (
        <div className='mt-2'>
          <SocialLinks
            socialLinks={socialLinks.fields}
            className='justify-center'
          />
        </div>
      )}
    </div>
  );
};

const TeamSelector: React.FC<{
  teams: ITeam[];
  selectedTeam: string | null;
}> = ({ teams, selectedTeam }) => {
  const [hovered, setHovered] = useState<string | null>();

  const getBackgroundColor = (slug: string, color: string) => {
    if (selectedTeam === slug || hovered === slug) {
      return color;
    }
    return undefined;
  };

  return (
    <div className='flex flex-wrap justify-center max-w-6xl m-auto mb-10'>
      {teams
        .map((t) => t.fields)
        .map(({ name, color, icon, sprite, slug }) => (
          <Link
            key={slug}
            href={{ hash: slug }}
            style={{ backgroundColor: getBackgroundColor(slug, color) }}
            className={'w-20 h-20 flex-grow-0 transition-colors'}
            onPointerEnter={() => setHovered(slug)}
            onPointerLeave={() =>
              setHovered((curr) => (curr === slug ? null : curr))
            }
          >
            {sprite ? (
              <ContentfulImage
                image={sprite}
                alt={name}
                width={75}
                height={75}
                priority
              />
            ) : (
              <div className='text-4xl'>{icon}</div>
            )}
          </Link>
        ))}
    </div>
  );
};

const MemberList: React.FC<{ members: ITeamMember[]; teams: ITeam[] }> = ({
  members,
  teams,
}) => {
  const colorMap = useMemo(() => {
    if (!teams) return {};
    return teams.reduce(
      (acc, curr) => {
        const { name: teamName, color } = curr.fields;

        acc[teamName] = color;
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [teams]);

  return (
    <div className='md:mx-auto md:w-4/6'>
      <div className='flex flex-wrap justify-center'>
        {members.map((m) => (
          <div className='m-5' key={m.sys.id}>
            <TeamMemberCard
              member={m}
              teamColor={colorMap[m.fields.team!.fields.name]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const useFilteredMembers = (
  allMembers: ITeamMember[],
  selectedTeam: string | null,
  pageSize: number,
  pageNumber: number,
) => {
  return useMemo(() => {
    const filteredByTeam = selectedTeam
      ? allMembers.filter((p) => {
          return p.fields.team?.fields.slug === selectedTeam;
        })
      : allMembers;

    const paged = filteredByTeam.slice(0, pageSize * pageNumber);

    return {
      members: paged,
      totalMembers: filteredByTeam.length,
    };
  }, [allMembers, selectedTeam, pageSize, pageNumber]);
};

const TEAM_SQUARES = [
  { color: 'grey-light', size: 16, left: 0, bottom: 0 },
  { color: 'grey-lighter', size: 16, left: 16, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
  { color: 'white', size: 16, right: 0, top: 0 },
];

interface TeamProps {
  teams: ITeam[];
  teamMembers: ITeamMember[];
}

const Team: PageWithLayout<TeamProps> = ({ teams, teamMembers }) => {
  const intl = useIntl();

  const [team] = useHash();

  const teamStore = useTeamStore();
  const [shuffledTeamMembers, setShuffledTeamMembers] = useState<ITeamMember[]>(
    [],
  );

  const { pageNumber, pageSize, viewMore } = useViewMore();
  const { members, totalMembers } = useFilteredMembers(
    shuffledTeamMembers,
    team,
    pageSize,
    pageNumber,
  );

  useEffect(() => {
    if (teamStore.teamOrder.length <= 0) {
      teamStore.setTeamOrder(shuffle(teams));
    }
  }, [teamStore, teams]);

  useEffect(() => {
    setShuffledTeamMembers([
      ...shuffle<ITeamMember>(
        teamMembers.filter((member) => member.fields.isTeamLeader),
      ),
      ...shuffle<ITeamMember>(
        teamMembers.filter((member) => !member.fields.isTeamLeader),
      ),
    ]);
  }, [teamMembers]);

  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.people.section.volunteers.next-seo.title',
          defaultMessage: 'Our Volunteers',
        })}
      />
      <FirstSubSection
        header={intl.formatMessage({
          id: 'page.people.section.volunteers.intro.heading',
          defaultMessage: 'Our <b>volunteers</b>',
        })}
      >
        <FormattedMessage
          id='page.people.section.volunteers.intro.paragraph'
          defaultMessage='Our volunteer community is at the heart of our organization, and enables us to build innovative projects and contribute to the movement in meaningful ways. <b>Click on an icon to meet the volunteers in each team!</b>'
          values={{
            b: (chunks) => <b>{chunks}</b>,
          }}
        />
      </FirstSubSection>
      <div className='m-10'>
        <TeamSelector selectedTeam={team} teams={teamStore.teamOrder} />
        <MemberList members={members} teams={teams} />
        {members.length < totalMembers && (
          <div className='mt-10 flex justify-center'>
            <WhiteButton
              className='content-center font-mono text-2xl'
              onClick={() => viewMore()}
            >
              <FormattedMessage
                id='page.people.section.volunteers.button.load-more'
                defaultMessage='Load more'
              />
            </WhiteButton>
          </div>
        )}
      </div>
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
          <FormattedMessage
            id='page.people.section.volunteers.community.paragraph'
            defaultMessage='We are more than a group of volunteers; we are a community tethered by shared values and invested in a vision of a better world for animals. We believe in a community-first approach: one that is supportive, growth-oriented, and accountable to each other. If this resonates with you, scroll down to learn more.'
          />
        </FirstSubSection>
      </div>
    </>
  );
};

Team.Layout = PeopleLayout;

export default Team;
