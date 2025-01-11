import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';
import { formatNumber } from 'lib/helpers/format';
import getServerIntl from 'app/intl';

import reddit from '~images/work/communities/reddit.png';
import ara from '~images/work/communities/ARA.png';

const TOP_DECORATION_SQUARES = [
  { color: '#454545', size: 16, left: 0, top: 0 },
];

const BOTTOM_DECORATION_SQUARES = [
  { color: '#454545', size: 16, right: 0, bottom: 0 },
];

const redditLink = 'https://reddit.com/r/vegan';
const discordLink = 'https://aramovement.org';

interface OurCommunitiesProps {
  locale: string;
}

const OurCommunities: React.FC<OurCommunitiesProps> = ({
  locale,
}: OurCommunitiesProps) => {
  const intl = getServerIntl(locale);

  const redditMembers = intl.formatMessage(
    {
      id: 'page.our-work.section.our-communities.member-count.reddit',
      defaultMessage: '<no-localization>{count}</no-localization> members',
    },
    { count: formatNumber(1400000) + '+' },
  );

  const araMembers = intl.formatMessage(
    {
      id: 'page.our-work.section.our-communities.member-count.ara',
      defaultMessage: '<no-localization>{count}</no-localization> members',
    },
    { count: formatNumber(25000) + '+' },
  );

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='relative w-full overflow-hidden text-xl text-white bg-[#292929] py-20  px-5'>
        <SectionHeader
          header={intl.formatMessage({
            id: 'page.our-work.section.communities.headline',
            defaultMessage: 'Our <b>COMMUNITIES</b>',
          })}
        >
          <p className='text-xl'>
            {intl.formatMessage({
              id: 'page.our-work.section.our-communities.section-header.content',
              defaultMessage:
                'We manage these large communities of passionate vegans and activists, helping us empower a new age of volunteers and activism',
            })}
          </p>
        </SectionHeader>
        <div className='relative flex flex-col mx-auto max-w-md md:max-w-screen-lg gap-y-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 text-left gap-10 xl:gap-10 w-full'>
            <div>
              <a href={redditLink} target='_blank' rel='noreferrer'>
                <CustomImage src={reddit} alt='Reddit' />
              </a>

              <div className='font-bold'>
                <a href={redditLink} target='_blank' rel='noreferrer'>
                  {intl.formatMessage({
                    id: 'page.our-work.section.our-communities.cta.reddit',
                    defaultMessage:
                      'Vegans of <no-localization>Reddit</no-localization>',
                  })}
                </a>
              </div>
              <div>{redditMembers}</div>
            </div>
            <div>
              <div>
                <a href={discordLink} target='_blank' rel='noreferrer'>
                  <CustomImage src={ara} alt='Animal Rights Advocates' />
                </a>
              </div>
              <div className='font-bold'>
                <a href={discordLink} target='_blank' rel='noreferrer'>
                  {intl.formatMessage({
                    id: 'page.our-work.section.our-communities.cta.animal-rights-advocates',
                    defaultMessage:
                      '<no-localization>Animal Rights Advocates</no-localization>',
                  })}
                </a>
              </div>
              <div>{araMembers}</div>
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

export default OurCommunities;
