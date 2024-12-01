'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { defaultLocale } from '../../../../../../translation/defaultLocale';

import ContentfulImage from 'components/layout/contentfulImage';
import ShareDialog from 'components/layout/shareDialog';
import { DarkButton, ShareButton } from 'components/decoration/buttons';
import { usePathnameLocale } from 'lib/translation/usePathnameLocale';
import LocalizedContentfulEntryFieldClient from 'app/_localization/LocalizedContentfulEntryFieldClient';

import type { IProject } from 'types/generated/contentful';

const ProjectCard: React.FC<{
  project: IProject;
  translatedProjectDescription: Record<string, string>;
}> = ({
  project: {
    fields: { name, url, date: dateStr, image, team, retiredInfo },
  },
  translatedProjectDescription,
}) => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const shareInfo = useMemo(
    () => ({
      url,
      title: name,
      description: 'Take a look at this awesome project!',
      image,
    }),
    [image, name, url],
  );

  const openDialog = useCallback(() => {
    setShareDialogOpen(true);
  }, []);

  const locale = usePathnameLocale() ?? defaultLocale;

  const isRetired = !!retiredInfo;

  const date = useMemo(() => {
    if (isRetired) {
      return 'This project has been retired';
    }
    const formatter = new Intl.DateTimeFormat(locale, {
      month: 'short',
      year: 'numeric',
    });
    return formatter.format(new Date(dateStr));
  }, [dateStr, isRetired, locale]);

  return (
    <>
      <div className='flex flex-col lg:max-xl:flex-row gap-4 md:justify-start'>
        <div className='aspect-square relative w-64 md:w-80 flex-shrink-0 text-center md:text-left mx-auto md:mr-auto'>
          <ContentfulImage image={image} alt={name} />
        </div>
        <div className='space-y-4 xl:max-w-sm'>
          <h2 className='text-4xl font-bold'>{name}</h2>
          <div>
            <span className='font-bold'>
              <span className='text-grey'>{date}</span>
              {team && (
                <>
                  {' '}
                  -{' '}
                  <Link
                    href={{
                      pathname: `/${locale}/people/team`,
                      hash: team.fields.isInactive ? null : team.fields.slug,
                    }}
                    scroll={true}
                  >
                    {team.fields.icon}{' '}
                    <span style={{ color: team.fields.color }}>
                      {team.fields.name}
                    </span>
                  </Link>
                </>
              )}
            </span>
          </div>
          <div className='text-lg'>
            <LocalizedContentfulEntryFieldClient
              translatedEntryField={translatedProjectDescription}
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-9'>
            <DarkButton href={url} capitalize={false} className='text-center'>
              <FormattedMessage
                id='page.our-work.section.featured-projects.section.button.visit-project-page.label'
                defaultMessage='Visit'
              />
            </DarkButton>
            <ShareButton
              shareInfo={shareInfo}
              openAndInitiateShareDialog={openDialog}
            />
          </div>
        </div>
      </div>
      <ShareDialog
        open={shareDialogOpen}
        shareInfo={shareInfo}
        onClose={() => {
          setShareDialogOpen(false);
        }}
      />
    </>
  );
};

export default ProjectCard;
