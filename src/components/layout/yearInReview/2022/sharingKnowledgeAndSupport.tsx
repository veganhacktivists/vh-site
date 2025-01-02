import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';
import SquareField from '../../../decoration/squares';

import CustomImage from 'components/decoration/customImage';
import getServerIntl from 'app/intl';

import type { StaticImageData } from 'next/image';

import james from '~images/yearInReview/2022/james-morgan-at-ava-summit.jpg';
import malina from '~images/yearInReview/2022/malina-tran-at-care.jpg';
import family from '~images/yearInReview/2022/vh-family.jpg';

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

interface Props {
  locale: string;
}

const SharingKnowledgeAndSupport: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SectionContainer
        header={
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.year-in-review.2022.section.sharing-knowledge-and-support.headline',
              defaultMessage: 'Sharing <b>knowledge & support</b>',
            })}
          />
        }
      >
        <div className='text-xl md:w-2/3 xl:w-1/2 mx-auto'>
          {intl.formatMessage(
            {
              id: 'page.year-in-review.2022.section.sharing-knowledge-and-support.paragraph',
              defaultMessage:
                'This year, we were invited to speak at <no-localization><b>CARE Conference</b></no-localization> in <no-localization>Warsaw, Poland</no-localization> and the first-ever <no-localization><b>AVA Summit</b></no-localization> in <no-localization>Washington, DC</no-localization>. We spoke about our work for the animal protection movement and how organizations and individuals could get involved with our services to get the support they need.',
            },
            {
              b: (chunks) => <b>{chunks}</b>,
            },
          )}
        </div>
        <div className='xl:w-2/3 mx-auto mt-20'>
          <div className='flex flex-col md:flex-row gap-5 pb-20'>
            <div className='flex flex-col flex-1 min-w-[29%] lg:min-w-[25%] xl:min-w-[27%] 2xl:min-w-[32%] 3xl:min-w-[34%] gap-5 md:gap-1 lg:gap-5 justify-between'>
              <div className='flex '>
                <ImageWithCaption
                  bgColor='yellow'
                  image={malina}
                  caption={intl.formatMessage({
                    id: 'page.year-in-review.2022.section.sharing-knowledge-and-support.care-conference.caption',
                    defaultMessage:
                      '<no-localization>Malina Tran</no-localization> at <no-localization>CARE Conference</no-localization>',
                  })}
                  subcaption={intl.formatMessage({
                    id: 'page.year-in-review.2022.section.sharing-knowledge-and-support.care-conference.subcaption',
                    defaultMessage: 'Data & Tech in Animal Rights Activism',
                  })}
                />
              </div>
              <div className='flex '>
                <ImageWithCaption
                  bgColor='green'
                  image={james}
                  caption={intl.formatMessage({
                    id: 'page.year-in-review.2022.section.sharing-knowledge-and-support.ava-summit.caption',
                    defaultMessage:
                      '<no-localization>James Morgan</no-localization> at <no-localization>AVA Summit</no-localization>',
                  })}
                  subcaption={intl.formatMessage({
                    id: 'page.year-in-review.2022.section.sharing-knowledge-and-support.ava-summit.subcaption',
                    defaultMessage: 'Tech Innovation in Animal Protection',
                  })}
                />
              </div>
            </div>
            <div className='flex  items-center'>
              <div className='flex'>
                <CustomImage
                  src={family}
                  alt='Vegan Hacktivist team at the Animal & Vegan Advocacy Summit'
                />
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
      <SquareField
        className='hidden md:block'
        squares={[{ color: 'grey-background', left: 0, top: 0 }]}
      />
    </>
  );
};

export default SharingKnowledgeAndSupport;
