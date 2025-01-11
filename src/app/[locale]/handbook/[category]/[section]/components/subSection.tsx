'use client';

import { Waypoint } from 'react-waypoint';

import useDocsStore from 'lib/stores/docsStore';

import type { IDocumentationFields } from 'types/generated/contentful';

export const SubSectionWaypoint: React.FC<
  Pick<IDocumentationFields, 'slug'>
> = ({ slug }) => {
  const setCurrentDocSlug = useDocsStore((state) => state.setCurrentDocSlug);

  return (
    <>
      <Waypoint
        onEnter={() => {
          setCurrentDocSlug(slug);
        }}
      />
    </>
  );
};
