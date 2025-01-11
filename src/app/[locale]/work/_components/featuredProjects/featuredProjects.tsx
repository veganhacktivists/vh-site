'use server';

import ProjectCard from './ProjectCard';

import Sprite, { pig } from 'components/decoration/sprite';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';
import getServerIntl from 'app/intl';
import { getTranslatedEntryField } from 'app/_localization/getTranslatedEntry';

import type { IProject } from 'types/generated/contentful';

const TOP_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, top: 0 },
  { color: 'white', size: 16, right: 0, top: 0 },
];

const BOTTOM_DECORATION_SQUARES = [
  { color: 'gray-lighter', size: 16, left: 0, bottom: 0 },
  { color: 'gray-background', size: 16, right: 0, top: 0 },
];

interface FeaturedProjectsProps {
  locale: string;
  featuredProjects: IProject[];
}

const FeaturedProjects = async ({
  featuredProjects,
  locale,
}: FeaturedProjectsProps) => {
  const intl = getServerIntl(locale);

  const projectAndTranslationPairs = await Promise.all(
    featuredProjects.map(async (project) => {
      const translatedProjectDescription = await getTranslatedEntryField(
        {
          contentfulId: project.sys.id,
          fieldId: 'description',
          contentType: 'project',
        },
        locale,
      );

      return {
        project,
        translatedProjectDescription,
      };
    }),
  );

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='relative w-full overflow-hidden text-xl bg-grey-background'>
        <div className='relative px-5 py-20 mx-auto gap-y-8'>
          <SectionHeader
            className='mb-2'
            header={intl.formatMessage({
              id: 'page.our-work.section.featured-projects.section-header.headline',
              defaultMessage: 'Featured <b>PROJECTS</b>',
            })}
          >
            <p className='text-xl'>
              {intl.formatMessage({
                id: 'page.our-work.section.featured-projects.section-header.content',
                defaultMessage:
                  'Here are just a few of the projects we’ve built for the movement and in collaboration with other partners.',
              })}
            </p>
          </SectionHeader>
          <ul className='grid grid-cols-1 xl:grid-cols-3 mx-auto w-fit gap-20 gap-y-20'>
            {projectAndTranslationPairs.map(
              ({ project, translatedProjectDescription }) => (
                <li
                  key={project.sys.id}
                  className='mx-auto lg:even:mr-auto lg:odd:ml-auto'
                >
                  <ProjectCard
                    project={project}
                    translatedProjectDescription={translatedProjectDescription}
                  />
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <Sprite image={pig} pixelsLeft={1} pixelsRight={1} />

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className='hidden md:block'
      />
    </>
  );
};

export default FeaturedProjects;
