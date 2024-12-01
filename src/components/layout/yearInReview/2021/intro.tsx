import { FormattedMessage, useIntl } from 'react-intl';

import CustomLink from '../../../decoration/link';
import { SubSection } from '../../../decoration/textBlocks';
import { HighlightBlock } from '../highlightBlock';
import avocadoIcon from '../../../../../public/images/people/teamIcons/icon-avo.png';
import peachIcon from '../../../../../public/images/people/teamIcons/icon-peach.png';
import mangoIcon from '../../../../../public/images/people/teamIcons/icon-mango.png';
import watermelonIcon from '../../../../../public/images/people/teamIcons/icon-wmelon.png';
import sweetPotatoIcon from '../../../../../public/images/people/teamIcons/icon-spotato.png';
import { pixelHeart } from '../../../../images/separators';

import CustomImage from 'components/decoration/customImage';

const Intro: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <CustomImage
        src={pixelHeart}
        height={pixelHeart.height / 3}
        width={pixelHeart.width / 3}
        alt=''
      />
      <div className='px-5 mx-auto pb-10'>
        <SubSection
          header={intl.formatMessage({
            id: 'page.year-in-review.2021.section.we-grew.intro.heading',
            defaultMessage: 'We explored and grew so much this year',
          })}
          headerSize='3xl'
          contentSize='2xl'
        >
          <FormattedMessage
            id='page.year-in-review.2021.section.we-grew.intro.paragraph'
            defaultMessage="This year, we refined our goals and built projects that focused primarily on filling existing gaps in our movement. We grew more meaningful partnerships and we greatly improved our branding, design team, and services offered. We're excited to show you what we've done below!"
          />
        </SubSection>
      </div>

      <div>
        <HighlightBlock
          borderColor='magenta'
          headerStart='We launched'
          headerBold='8 new projects'
          headerEnd='for the movement'
        >
          <FormattedMessage
            id='page.year-in-review.2021.section.we-grew.projects.paragraph'
            defaultMessage='<b>Four of which were in-house projects.</b> We were also lucky enough to work on projects with <no-localization>Sehati Animal Sanctuary</no-localization>, <no-localization>Animal Alliance Asia</no-localization>, <no-localization>Vegan Japan Consulting</no-localization>, and many more.'
            values={{
              b: (chunks) => <b>{chunks}</b>,
            }}
          />
        </HighlightBlock>
        <HighlightBlock
          borderColor='yellow'
          headerStart='We'
          headerBold='expanded our advisory team'
          headerEnd='of vegan experts'
        >
          <FormattedMessage
            id='page.year-in-review.2021.section.we-grew.advisory-team.paragraph'
            defaultMessage="<b>We're so thankful to have more advisors to lean on</b> such as <no-localization>Katie</no-localization> from <no-localization>Animal Equality</no-localization>, <no-localization>Chris</no-localization> from <no-localization>APEX Advocacy</no-localization>, <no-localization>Tessa</no-localization> from the <no-localization>Pollination Project</no-localization>, and <no-localization>Casey</no-localization> from <no-localization>Faunalytics</no-localization>. To browse more of our advisors, <link>click here</link>."
            values={{
              b: (chunks) => <b>{chunks}</b>,
              link: (chunks) => (
                <CustomLink href={`/${intl.locale}/people/advisors`}>
                  {chunks}
                </CustomLink>
              ),
            }}
          />
        </HighlightBlock>
        <HighlightBlock
          borderColor='green'
          headerStart='We expanded with'
          headerBold='5 new teams'
          headerEnd='in just 6 months'
        >
          <FormattedMessage
            id='page.year-in-review.2021.section.we-grew.new-teams.paragraph'
            defaultMessage="<b>More teams, more impact!</b> We're so happy to announce the growth of our community with five new amazing teams. Please welcome Team Avocado, Team Mango, Team Watermelon, and Team Sweet Potato."
            values={{
              b: (chunks) => <b>{chunks}</b>,
            }}
          />
        </HighlightBlock>
        <div className='flex flex-row md:w-1/3 mx-auto mb-20 mt-20'>
          {[
            avocadoIcon,
            peachIcon,
            mangoIcon,
            watermelonIcon,
            sweetPotatoIcon,
          ].map((icon) => (
            <div key={icon.src}>
              <CustomImage src={icon} alt={icon.src} height={250} width={250} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Intro;
