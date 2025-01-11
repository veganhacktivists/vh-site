'use client';

import React, { useState } from 'react';

import { DarkButton } from '../../decoration/buttons';

import { ContentButton } from './contentButton';

import type { IProjectFields } from '../../../types/generated/contentful';

export interface HighlightedProject extends IProjectFields {
  customDescription: React.ReactNode;
}

interface HighlightedProjectsProps {
  projects: HighlightedProject[];
  darkBackground?: boolean;
}

export const HighlightedProjects: React.FC<HighlightedProjectsProps> = ({
  projects,
  darkBackground = false,
}) => {
  const [projectIndex, setProjectIndex] = useState<number>(0);
  const project = projects[projectIndex];

  return (
    <div className='md:py-24 md:-mt-16'>
      <div className='flex flex-col md:flex-row justify-center gap-x-16'>
        <div>
          <div className='overflow-hidden pb-80'>
            {projects.map((project, i) => {
              return (
                <div key={project.url}>
                  <ContentButton
                    white={!darkBackground}
                    down={projectIndex < i}
                    content={{ image: project.image, title: project.name }}
                    setContent={() => {
                      setProjectIndex(i);
                    }}
                    active={projectIndex === i}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className='md:w-1/2 lg:w-1/3 md:text-left mt-8 md:mt-0 mx-auto md:mx-0'>
          <h1 className='text-4xl font-bold mb-8'>{project.name}</h1>
          <div className='text-2xl space-y-10'>{project.customDescription}</div>
          <div className='flex mt-10 w-min mx-auto md:mx-0'>
            <DarkButton href={project.url} className='normal-case'>
              {project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </DarkButton>
          </div>
        </div>
      </div>
    </div>
  );
};
