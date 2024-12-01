import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

import SquareField from '../../../components/decoration/squares';
import Sprite, { pig, chicks } from '../../../components/decoration/sprite';

import JoinTheTeam from 'components/layout/joinTheTeam_pages';
import GrantsHero from 'components/layout/grants/grantsHero';
import GrantsHeading from 'components/layout/grants/grantsHeading';
import GrantsQualifications from 'components/layout/grants/grantsQualifications';
import GrantsPerks from 'components/layout/grants/grantsPerks';
import GrantsPollinationProject from 'components/layout/grants/grantsPollinationProject';
import GrantsApplication from 'components/layout/grants/grantsApplication';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'magenta', size: 32, left: 16, bottom: 0 },
  { color: 'orange', size: 16, left: 0, top: 0 },
  { color: 'yellow-orange', size: 16, right: 32, bottom: 16 },
  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const GRANTS_HEADING_SQUARES = [
  { color: 'yellow-orange', size: 16, left: 16, top: 0 },
];

const GRANTS_SUBHEADING_SQUARES = [
  { color: 'yellow-orange', size: 16, right: 0, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },
  { color: 'yellow', size: 16, right: 0, top: 0 },
];

const GRANTS_QUALIFICATIONS_SQUARES = [
  { color: 'gray', size: 16, left: 0, bottom: 0 },
  { color: 'gray-light', size: 16, left: 0, top: 0 },
];

const Grants: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.grants.next-seo.title',
          defaultMessage: 'Seed Funding Grants',
        })}
      />
      <GrantsHero />
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <GrantsHeading />
      <SquareField
        squares={GRANTS_HEADING_SQUARES}
        className='hidden md:block'
      />

      <div className='p-12 pb-20 bg-yellow'>
        <p className='max-w-screen-md mx-auto font-mono text-2xl text-center'>
          <FormattedMessage
            id='page.grants.content'
            defaultMessage='We connect you with funders providing up to <b>$1,000 USD in seed funding</b> for animal rights activism! We seek individual and grassroots groups whose primary purpose is to help reduce suffering for farmed animals.'
            values={{
              b: (chunks) => <b>{chunks}</b>,
            }}
          />
        </p>
      </div>
      <Sprite image={pig} />
      <SquareField
        squares={GRANTS_SUBHEADING_SQUARES}
        className='hidden md:block'
      />

      <GrantsQualifications />
      <SquareField
        squares={GRANTS_QUALIFICATIONS_SQUARES}
        className='hidden md:block'
      />

      <GrantsPerks />

      <div className='mb-24'>
        <GrantsPollinationProject />
      </div>
      <Sprite image={chicks} pixelsLeft={1} pixelsRight={3} />
      <SquareField
        squares={[
          { size: 16, color: 'grey-background', bottom: 0, left: 0 },
          { size: 16, color: 'white', top: 0, left: 0 },
          { size: 16, color: 'grey-light', bottom: 0, right: 16 },
          { size: 16, color: 'grey-light', top: 0, right: 0 },
          { size: 16, color: 'grey-background', bottom: 0, right: 0 },
        ]}
        className='hidden md:block'
      />
      <GrantsApplication />

      <JoinTheTeam />
    </>
  );
};

export default Grants;
