import React from 'react';

import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';
import { LightButton } from 'components/decoration/buttons';
import getServerIntl from 'app/intl';

import ARABackground from '~images/yearInReview/2022/ara-background.png';
import ARALogo from '~images/yearInReview/2022/ara-logo.png';
import ARAAnimals from '~images/yearInReview/2022/ara-animals.png';
import ARADiscord from '~images/yearInReview/2022/ara-discord.png';

interface Props {
  locale: string;
}

const AnimalRightsAdvocates: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        squares={[{ left: 0, bottom: 0, color: 'grey-background', size: 16 }]}
      />
      <div className='w-full relative'>
        <CustomImage
          alt=''
          src={ARABackground}
          fill
          sizes='100vw'
          style={{
            objectFit: 'cover',
            objectPosition: 'top',
          }}
        />
        <div className='flex relative z-10'>
          <div className='flex flex-row'>
            <div className='w-full lg:w-1/2 self-center'>
              <div className='xl:w-2/3 lg:mx-0 lg:ml-5 py-10 lg:py-0 xl:ml-auto '>
                <div className='md:w-[668px] md:h-[204px] px-5 md:px-0 mx-auto lg:mx-0'>
                  <CustomImage
                    alt='Animal Rights Advocates logo'
                    src={ARALogo}
                  />
                </div>
              </div>
            </div>
            <div className='w-1/2 collapse lg:visible'>
              <div className='flex'>
                <CustomImage alt='ARA animals' src={ARAAnimals} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full bg-grey px-5'>
        <div className='xl:w-2/3 mx-auto flex flex-row flex-wrap py-20'>
          <div className='text-white w-full md:w-2/3 text-center md:text-left md:pr-5'>
            <span className='text-6xl font-mono font-bold uppercase'>
              {intl.formatMessage({
                id: 'page.year-in-review.2022.section.animal-rights-advocates.heading',
                defaultMessage: 'Uplifting online community',
              })}
            </span>
            <div className='mt-10'>
              <span className='text-xl'>
                {intl.formatMessage({
                  id: 'page.year-in-review.2022.section.animal-rights-advocates.paragraph',
                  defaultMessage:
                    'We acquired the largest animal rights online community in the world. Founded in 2019, <no-localization>Animal Rights Advocates (ARA)</no-localization> is a platform on <no-localization>Discord</no-localization> for young activists. <no-localization>ARA</no-localization> has over 22,000 members who participate daily in vegan outreach efforts across hundreds of <no-localization>Discord</no-localization> communities. In addition to outreach events and training, this community also hosts <no-localization>AMA</no-localization> events with philosophers, activists, and influencers every week. <no-localization>ARA</no-localization> is also an inclusive community that strongly believes in intersectionality, feminism, diversity, trans rights, and more – a space where everyone is welcome.',
                })}
              </span>
              <div className='flex flex-col sm:flex-row justify-start md:justify-left mt-12 gap-10'>
                <LightButton href='https://discord.gg/animalrights'>
                  {intl.formatMessage({
                    id: 'page.year-in-review.2022.section.animal-rights-advocates.btn.community.cta',
                    defaultMessage: 'Join the Community',
                  })}
                </LightButton>
                <LightButton href='https://www.aramovement.org/'>
                  {intl.formatMessage({
                    id: 'page.year-in-review.2022.section.animal-rights-advocates.btn.website.cta',
                    defaultMessage: 'Visit Website',
                  })}
                </LightButton>
              </div>
            </div>
          </div>
          <div className='md:pl-5 w-1/3 collapse md:visible'>
            <div className='ml-auto flex '>
              <CustomImage src={ARADiscord} alt='ARA Discord' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimalRightsAdvocates;
