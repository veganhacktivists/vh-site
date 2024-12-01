import CustomImage from 'components/decoration/customImage';
import CustomLink from 'components/decoration/link';
import getServerIntl from 'app/intl';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';

import type { StaticImageData } from 'next/image';

import avaKateAndJames from '~images/work/knowlegeSharingAndSupport/AVA_2024_DC_Summit_2.png';
import jamesErasmusUniversity from '~images/work/knowlegeSharingAndSupport/James_Erasmus_University_Rotterdam.png';
import team from '~images/work/knowlegeSharingAndSupport/AVA_2024_Team_19.png';

const TOP_DECORATION_SQUARES = [
  { color: '#292929', size: 16, right: 0, top: 0 },
];

const BOTTOM_DECORATION_SQUARES = [
  {
    left: 0,
    bottom: 0,
    color: '#DDDDDD',
    size: 16,
  },
];

interface SharingKnowledgeAndSupportProps {
  locale: string;
}

const SharingKnowledgeAndSupport: React.FC<SharingKnowledgeAndSupportProps> = ({
  locale,
}: SharingKnowledgeAndSupportProps) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='xl:w-2/3 mx-auto mt-20 px-5'>
        <div className='flex flex-col md:flex-row justify-between'>
          <div>
            <SectionHeader
              header={intl.formatMessage({
                id: 'page.our-work.section.sharing-knowledge-and-support.section-header.headline',
                defaultMessage: 'Sharing Our <b>knowledge & support</b>',
              })}
              rootClassName='text-left mx-auto text-center md:text-left'
              stackEntries
            >
              <p className='text-xl max-w-prose'>
                {intl.formatMessage(
                  {
                    id: 'page.our-work.section.sharing-knowledge-and-support.section-header.content',
                    defaultMessage:
                      "We're often speaking at animal protection and <no-localization>EA</no-localization> related conferences every year and around the world! Be sure to look out for our booth or speakers, we'd love to meet you and see where we might be able to support your work. Follow us on <no-localization><link>Instagram</link></no-localization> to see where we'll be next!",
                  },
                  {
                    link: (chunk) => (
                      <CustomLink href='https://instagram.com/veganhacktivists'>
                        {chunk}
                      </CustomLink>
                    ),
                  },
                )}
              </p>
            </SectionHeader>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-10 pb-20'>
          <div className='flex flex-col flex-1 min-w-[29%] lg:min-w-[25%] xl:min-w-[27%] 2xl:min-w-[32%] 3xl:min-w-[34%] gap-5 md:gap-1 lg:gap-10 justify-start md:justify-between'>
            <div className='flex'>
              <ImageWithCaption
                bgColor='yellow'
                image={jamesErasmusUniversity}
                caption={intl.formatMessage({
                  id: 'page.our-work.section.sharing-knowledge-and-support.conferences.1.caption',
                  defaultMessage:
                    '<no-localization>James Morgan</no-localization> at <no-localization>Erasmus University</no-localization> in Rotterdam',
                })}
                subcaption={intl.formatMessage({
                  id: 'page.our-work.section.sharing-knowledge-and-support.conferences.1.subcaption',
                  defaultMessage: 'Why Animal Suffering Matters',
                })}
              />
            </div>
            <div className='flex'>
              <ImageWithCaption
                bgColor='green'
                image={avaKateAndJames}
                caption={intl.formatMessage({
                  id: 'page.our-work.section.sharing-knowledge-and-support.conferences.2.caption',
                  defaultMessage:
                    '<no-localization>James Morgan</no-localization> and <no-localization>Kate Rodman</no-localization> at <no-localization>AVA Summit</no-localization>',
                })}
                subcaption={intl.formatMessage({
                  id: 'page.our-work.section.sharing-knowledge-and-support.conferences.2.subcaption',
                  defaultMessage: 'Capacity Building Meetup',
                })}
              />
            </div>
          </div>
          <div className='flex flex-grow'>
            <div className='flex flex-grow items-center justify-end'>
              <CustomImage
                src={team}
                alt='Vegan Hacktivists team at the Animal & Vegan Advocacy Summit'
              />
            </div>
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

interface ImageWithCaptionTypes {
  caption: string;
  subcaption?: string;
  image: StaticImageData;
  bgColor: string;
}

const ImageWithCaption: React.FC<ImageWithCaptionTypes> = ({
  caption,
  subcaption,
  image,
  bgColor,
}) => {
  return (
    <div className={'flex flex-col'}>
      <CustomImage src={image} alt={caption} />
      <div
        className={'text-left flex-x-grow flex-x-shrink flex flex-col h-auto'}
      >
        <div className={`bg-${bgColor} items-center`}>
          <div className='p-5 md:p-3 lg:p-5'>
            <span className='font-bold text-xl leading-5 md:text-lg md:leading-4 lg:text-xl lg:leading-5 block pb-2'>
              {caption}
            </span>
            <span className='italic text-lg leading-5 md:text-base md:leading-4 lg:text-lg lg:leading-5 block'>
              {subcaption}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharingKnowledgeAndSupport;
