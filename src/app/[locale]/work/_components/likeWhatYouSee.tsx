import { LightButton } from 'components/decoration/buttons';
import Sprite, { duck } from 'components/decoration/sprite';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';
import getServerIntl from 'app/intl';

const TOP_DECORATION_SQUARES = [{ color: 'white', size: 16, right: 0, top: 0 }];

interface LikeWhatYouSeeProps {
  locale: string;
}

const LikeWhatYouSee: React.FC<LikeWhatYouSeeProps> = ({
  locale,
}: LikeWhatYouSeeProps) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='relative w-full overflow-hidden text-xl text-white bg-[#3D3D3D]'>
        <div className='relative flex flex-col items-center px-2 py-20 gap-y-8'>
          <SectionHeader
            className='mb-2'
            header={intl.formatMessage({
              id: 'page.our-work.section.like-what-you-see.headline',
              defaultMessage: '<b>LIKE WHAT YOU SEE?</b>',
            })}
          />

          <div className='text-xl md:w-1/2 xl:w-1/2 mx-auto pb-4'>
            {intl.formatMessage({
              id: 'page.our-work.section.like-what-you-see.introduction',
              defaultMessage:
                'Get in touch if you’d like to volunteer, support our work, or make use of our services!',
            })}
          </div>

          <div className='grid grid-cols-1 grid-rows-2 md:grid-rows-1 grid-flow-row sm:grid-flow-col gap-9'>
            <LightButton
              className='w-full md:w-fit'
              href={`/${locale}/support`}
            >
              {intl.formatMessage({
                id: 'page.our-work.section.like-what-you-see.donate.cta-button.label',
                defaultMessage: 'Donate',
              })}
            </LightButton>
            <LightButton
              className='w-full md:w-fit'
              href={`/${locale}/support`}
            >
              {intl.formatMessage({
                id: 'page.our-work.section.like-what-you-see.get-support.cta-button.label',
                defaultMessage: 'Get support',
              })}
            </LightButton>
            <LightButton
              className='w-full md:w-fit'
              href={`/${locale}/services`}
            >
              {intl.formatMessage({
                id: 'page.our-work.section.like-what-you-see.services.cta-button.label',
                defaultMessage: 'Services',
              })}
            </LightButton>
            <LightButton
              className='w-full md:w-fit'
              href={`/${locale}/contact`}
            >
              {intl.formatMessage({
                id: 'page.our-work.section.like-what-you-see.contact.cta-button.label',
                defaultMessage: 'Contact us',
              })}
            </LightButton>
          </div>
        </div>
      </div>

      <Sprite image={duck} pixelsLeft={1} pixelsRight={0} />
    </>
  );
};

export default LikeWhatYouSee;
