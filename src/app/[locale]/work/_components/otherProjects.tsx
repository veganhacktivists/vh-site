import ContentfulImage from 'components/layout/contentfulImage';
import { Carousel } from 'components/decoration/carousel';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';
import Link from 'components/decoration/link';
import getServerIntl from 'app/intl';

import type { IProject } from 'types/generated/contentful';

const TOP_DECORATION_SQUARES = [
  { color: 'gray-background', size: 16, right: 0, top: 0 },
];

const BOTTOM_DECORATION_SQUARES = [
  { color: '#BCBCBC', size: 16, left: 0, bottom: 0 },
  { color: '#171919', size: 16, right: 0, bottom: 0 },
];

interface OtherProjectsProps {
  locale: string;
  projects: IProject[];
}

const OtherProjects = ({ locale, projects }: OtherProjectsProps) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='relative w-full overflow-hidden text-xl text-white bg-[#3D3D3D]'>
        <div className='relative flex flex-col px-2 py-20 gap-y-8'>
          <SectionHeader
            className='mb-2'
            header={intl.formatMessage({
              id: 'page.our-work.section.other-projects.headline',
              defaultMessage: 'Other <b>projects</b>',
            })}
          />
          <div className='mx-auto'>
            <Carousel
              pageWidth={5}
              items={projects.map(
                ({
                  sys: { id },
                  fields: { name, image, url, retiredInfo },
                }) => (
                  <Link key={id} href={retiredInfo?.fields?.archiveUrl ?? url}>
                    <ContentfulImage title={name} image={image} alt={name} />
                  </Link>
                ),
              )}
            />
          </div>
        </div>
      </div>

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className='hidden md:block'
      />
    </>
  );
};

export default OtherProjects;
