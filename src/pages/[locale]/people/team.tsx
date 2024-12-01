import { NextSeo } from 'next-seo';
import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import PeopleLayout from '../../../components/layout/people';
import { FirstSubSection } from '../../../components/decoration/textBlocks';
import { getContents } from '../../../lib/cms';
import SquareField from '../../../components/decoration/squares';
import { getActiveTeams } from '../../../lib/cms/helpers';
import ContentfulImage from '../../../components/layout/contentfulImage';
import SocialLinks from '../../../components/layout/team/socialLinks';
import { pixelHeart } from '../../../images/separators';

import CustomImage from 'components/decoration/customImage';
import LocalizedContentfulEntryField from 'components/localization/LocalizedContentfulEntryField';
import LocalizedContentfulPageToggleButton from 'components/localization/LocalizedContentfulPageToggleButton';

import type PageWithLayout from '../../../types/persistentLayout';
import type { ITeamFields } from '../../../types/generated/contentful';
import type { ITeamMember } from '../../../types/generated/contentful';
import type { ITeam } from '../../../types/generated/contentful';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const teams = await getActiveTeams();
  const members = await getContents<ITeamFields>({
    contentType: 'teamMember',
    query: {
      isCoreMember: true,
      type: 'team',
      filters: {
        exists: {
          team: true,
          isCoreMember: true,
        },
        ne: {
          isInactive: true,
        },
      },
    },
    other: { order: 'fields.prio' },
  });

  return {
    props: { teams, members },
    revalidate: 480,
  };
};

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

const TeamMemberCardPhoto: React.FC<{
  member: ITeamMember;
  teamColor: string;
}> = ({ member, teamColor }) => {
  const { name, image, isTeamLeader } = member.fields;

  return (
    <div className='flex-none w-64 h-64'>
      <div className='flex justify-end h-64 mb-2 bg-grey w-100 group'>
        {image && (
          <div className='relative w-full filter'>
            <ContentfulImage
              downloadwidth={500}
              image={image}
              alt={name}
              priority={isTeamLeader}
            />
            <div
              className={'left-0 top-0 w-full h-full absolute opacity-0'}
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
    </div>
  );
};

const TeamMemberCardBody: React.FC<{
  member: ITeamMember;
}> = ({ member }) => {
  const { name, team, bio, socialLinks } = member.fields;
  const { name: teamName, sprite: teamSprite } = team!.fields;

  return (
    <div className='grow shrink lg:text-left justify-center lg:justify-start'>
      <div className='text-2xl mb-[-6px] font-bold text-grey'>{name}</div>
      <div>
        <div
          className={
            'flex flex-row justify-center lg:justify-start items-center'
          }
        >
          <span className='flex flex-col lg:flex-row items-center'>
            <span className='font-bold float-left text-lg uppercase text-grey text-opacity-80'>
              <LocalizedContentfulEntryField
                contentfulId={member.sys.id}
                fieldId='position'
                contentType='teamMember'
              />
            </span>
            <span className='mx-1 ml-3 hidden lg:block float-left text-lg text-grey-light relative'>
              &bull;
            </span>
            <div className={'ml-[-2px] float-left'}>
              {teamSprite && (
                <ContentfulImage
                  image={teamSprite}
                  alt={teamName}
                  width={'40'}
                  height={'40'}
                  priority
                />
              )}
            </div>
          </span>
        </div>
        <div className='mt-2 text-justify lg:text-left'>
          {bio && (
            <LocalizedContentfulEntryField
              contentfulId={member.sys.id}
              fieldId='bio'
              contentType='teamMember'
            />
          )}
        </div>
      </div>
      {socialLinks && (
        <div className={'mt-6'}>
          <SocialLinks socialLinks={socialLinks.fields} className='mt-2' />
        </div>
      )}
    </div>
  );
};

const TeamMemberCard: React.FC<{
  member: ITeamMember;
  teamColor: string;
  showPhotoFirst: boolean;
  showDividerBelow: boolean;
}> = ({ member, teamColor, showPhotoFirst, showDividerBelow }) => {
  if (showPhotoFirst) {
    return (
      <div
        className={`flex flex-col lg:flex-row flex-wrap items-center lg:items-start gap-4 lg:gap-8 lg:flex-nowrap justify-center lg:justify-start pb-12 pt-8 lg:pt-0 lg:pb-8 mb-0 border-grey-light border-opacity-40 ${
          showDividerBelow ? 'border-b-2' : ''
        }`}
      >
        <TeamMemberCardPhoto member={member} teamColor={teamColor} />
        <TeamMemberCardBody member={member} />
      </div>
    );
  } else {
    return (
      <div
        className={`flex flex-col-reverse lg:flex-row items-center lg:items-start flex-wrap-reverse gap-4 lg:gap-8 lg:flex-nowrap justify-center lg:justify-start pb-12 pt-8 lg:pt-0 lg:pb-8  mb-0 border-grey-light border-opacity-40 ${
          showDividerBelow ? 'border-b-2' : ''
        }`}
      >
        <TeamMemberCardBody member={member} />
        <TeamMemberCardPhoto member={member} teamColor={teamColor} />
      </div>
    );
  }
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
      {members.map((m, index) => (
        <div className='m-5' key={m.sys.id}>
          <TeamMemberCard
            member={m}
            teamColor={colorMap[m.fields.team!.fields.name]}
            showPhotoFirst={!(index % 2)}
            showDividerBelow={index + 1 < members.length}
          />
        </div>
      ))}
    </div>
  );
};

const TEAM_SQUARES = [
  { color: 'grey-light', size: 16, left: 0, bottom: 0 },
  { color: 'grey-lighter', size: 16, left: 16, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
  { color: 'white', size: 16, right: 0, top: 0 },
];

interface TeamProps {
  teams: ITeam[];
  members: ITeamMember[];
}

const Team: PageWithLayout<TeamProps> = ({ teams, members }) => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.people.section.team.next-seo.title',
          defaultMessage: 'Our Team',
        })}
      />
      <div className='md:mx-auto md:w-4/6 pb-10'>
        <LocalizedContentfulPageToggleButton className='mx-12 w-fit' />
      </div>
      <div className='m-10'>
        <MemberList members={members} teams={teams} />
      </div>
      <SquareField squares={TEAM_SQUARES} className='hidden md:block' />
      <div className='px-10 pt-16 pb-10 bg-gray-background'>
        <CustomImage
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt={intl.formatMessage({
            id: 'page.people.section.team.community.image.alt-text',
            defaultMessage: 'Our community',
          })}
        />
        <FirstSubSection
          header={intl.formatMessage({
            id: 'page.people.section.team.community.heading',
            defaultMessage: 'Our <b>community</b>',
          })}
        >
          <FormattedMessage
            id='page.people.section.team.community.paragraph'
            defaultMessage='We are more than a group of volunteers; we are a community tethered by shared values and invested in a vision of a better world for animals. We believe in a community-first approach: one that is supportive, growth-oriented, and accountable to each other. If this resonates with you, scroll down to learn more.'
          />
        </FirstSubSection>
      </div>
    </>
  );
};

Team.Layout = PeopleLayout;

export default Team;
