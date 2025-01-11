import React from 'react';

import SquareField from '../../../decoration/squares';
import { SectionHeader } from '../../../decoration/textBlocks';
import YoutubeVideo from '../../../decoration/youtubeVideo';
import SectionContainer from '../sectionContainer';

import { DarkButton } from 'components/decoration/buttons';
import getServerIntl from 'app/intl';

interface Props {
  locale: string;
}

const AnimatedVideos: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        squares={[
          { color: 'white', bottom: 0, left: 0, size: 16 },
          { color: 'grey-darker', top: 0, right: 0, size: 16 },
          { color: 'grey', bottom: 0, right: 0, size: 16 },
        ]}
        className='hidden md:block'
      />
      <SectionContainer
        header={
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.year-in-review.2022.section.new-videos.headline',
              defaultMessage: 'New <b>videos</b>',
            })}
          />
        }
      >
        <div className='text-xl mx-auto md:w-2/3 xl:w-1/2'>
          {intl.formatMessage({
            id: 'page.year-in-review.2022.section.new-videos.paragraph',
            defaultMessage:
              "Check out our latest videos from 2022! We have more videos in the pipeline so keep an eye out and subscribe to our youtube channel if you'd like to be the first to watch.",
          })}
        </div>
        <div className='pb-10'>
          <div className='flex flex-col md:flex-row mx-auto gap-y-10 gap-x-10 xl:w-2/3 mt-10 mb-10'>
            <div className='w-full'>
              <YoutubeVideo
                id='4ff-UfXfumM'
                title='Vegan Linguists - Have vegan content? Get it translated - or - Translate for the Animals!'
              />
            </div>
            <div className='w-full'>
              <YoutubeVideo
                id='jaW8n1pd97U'
                title='Vegan Hacktivists - Digital Disruptors for Animals!'
              />
            </div>
          </div>
        </div>
        <div className='flex justify-center pb-10'>
          <DarkButton href='https://www.youtube.com/@VeganHacktivists'>
            {intl.formatMessage({
              id: 'page.year-in-review.2022.section.new-videos.btn.cta',
              defaultMessage: 'Watch more videos',
            })}
          </DarkButton>
        </div>
      </SectionContainer>
    </>
  );
};

export default AnimatedVideos;
