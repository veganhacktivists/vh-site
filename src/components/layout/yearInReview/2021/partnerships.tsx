import { FormattedMessage, useIntl } from 'react-intl';

import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';
import avPartner from '../../../../../public/images/yearInReview/2021/partner_av.png';
import pollinationPartner from '../../../../../public/images/yearInReview/2021/partner_pollinationproject.png';
import otherPartner from '../../../../../public/images/yearInReview/2021/partner_other.png';
import CustomLink from '../../../decoration/link';
import SquareField from '../../../decoration/squares';

import CustomImage from 'components/decoration/customImage';

import type { StaticImageData } from 'next/image';

interface PartnershipProps extends React.PropsWithChildren {
  image: StaticImageData;
  title: React.ReactNode;
}

const Partnership: React.FC<PartnershipProps> = ({
  image,
  title,
  children,
}) => {
  return (
    <div>
      <div className='flex flex-col md:flex-row gap-x-10'>
        <div className='w-2/3 mx-auto md:w-40'>
          <CustomImage src={image} alt='' />
        </div>
        <div className='flex flex-col md:text-left flex-1'>
          <div className='font-bold text-4xl pb-5'>{title}</div>
          <div className='space-y-5'>{children}</div>
        </div>
      </div>
    </div>
  );
};

const Partnerships: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <SectionContainer
        header={
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.year-in-review.2021.section.partnerships.intro.headline',
              defaultMessage: 'Building meaningful <b>partnerships</b>',
            })}
            className='text-grey'
          >
            <FormattedMessage
              id='page.year-in-review.2021.section.partnerships.intro.paragraph'
              defaultMessage='This year we looked back at our previous partnerships and brainstormed together on how our future partnerships could lead to more effective and long-lasting relationships. We wanted our partnerships to extend with more complexity and with more impact for both them, and us.'
            />
          </SectionHeader>
        }
      >
        <div className='md:w-3/4 mx-auto space-y-20 mt-10'>
          <Partnership
            image={pollinationPartner}
            title={intl.formatMessage({
              id: 'page.year-in-review.2021.section.partnerships.pollination-project.heading',
              defaultMessage:
                'Partnership with <no-localization>The Pollination Project</no-localization>',
            })}
          >
            <p>
              <FormattedMessage
                id='page.year-in-review.2021.section.partnerships.pollination-project.paragraph.0'
                defaultMessage="We were very happy to <link>announce a partnership</link> in where we're able to offer up to $1000 USD in seed funding grants for outstanding, and effective, animal rights activism! Specifically we're looking for individual or grassroots groups whose primary purpose is to help reduce suffering for non-human farmed animals."
                values={{
                  link: (chunks) => (
                    <CustomLink href={`/${intl.locale}/people/advisors`}>
                      {chunks}
                    </CustomLink>
                  ),
                }}
              />
            </p>
            <p>
              <FormattedMessage
                id='page.year-in-review.2021.section.partnerships.pollination-project.paragraph.1'
                defaultMessage='In our first month alone, we averaged one grant request per day received by various activists and organizations. Grant requests were for a wide variety of forms of activism, including: Singing, Virtual Reality, Drawing, Photography, Videography, Baking, Fundraising, Welfare Awareness, Child Education, Youth Skills, Capacity Building, Farming, Campaigning, Printing, Litigation, Animal Rescue, Wild Animal Advocacy and more!'
              />
            </p>
            <p>
              <FormattedMessage
                id='page.year-in-review.2021.section.partnerships.pollination-project.paragraph.2'
                defaultMessage="We're excited to see where this partnership leads us in the future as we work together with <link>The Pollination Project</link> to get these activists funded as much as possible."
                values={{
                  link: (chunks) => (
                    <CustomLink href='https://thepollinationproject.org/'>
                      {chunks}
                    </CustomLink>
                  ),
                }}
              />
            </p>
          </Partnership>
          <Partnership
            image={avPartner}
            title={intl.formatMessage({
              id: 'page.year-in-review.2021.section.partnerships.anonymous-for-the-voiceless.heading',
              defaultMessage:
                'Partnership with <no-localization>Anonymous for the Voiceless</no-localization>',
            })}
          >
            <p>
              <FormattedMessage
                id='page.year-in-review.2021.section.partnerships.anonymous-for-the-voiceless.paragraph.0'
                defaultMessage='<no-localization>Anonymous for the Voiceless (AV)</no-localization> is a not-for-profit animal rights organisation specializing in using conversation and standard practice footage to edify the public about animal exploitation. They hold street activism events worldwide to edify the public towards supporting animal rights, living vegan and speaking up for the animals.'
              />
            </p>
            <p>
              <FormattedMessage
                id='page.year-in-review.2021.section.partnerships.anonymous-for-the-voiceless.paragraph.1'
                defaultMessage="Traditionally, it's been very hard to track the effectiveness of street outreach. We're excited to have partnered up with <no-localization>AV</no-localization> in order to be able to provide them the tools they need to monitor and track the effectiveness of each group with <link>Activist Hub</link>."
                values={{
                  link: (chunks) => (
                    <CustomLink href='https://activisthub.org'>
                      {chunks}
                    </CustomLink>
                  ),
                }}
              />
            </p>
          </Partnership>
          <Partnership
            image={otherPartner}
            title={intl.formatMessage({
              id: 'page.year-in-review.2021.section.partnerships.other-partnerships.heading',
              defaultMessage: 'Other Partnerships',
            })}
          >
            <p>
              <CustomLink href='https://veganoutreach.org'>
                <span className='block md:inline'>
                  <b>
                    <FormattedMessage
                      id='page.year-in-review.2021.section.partnerships.other-partnerships.vegan-outreach.heading'
                      defaultMessage='<no-localization>Vegan Outreach</no-localization>'
                    />
                  </b>
                </span>
              </CustomLink>
              <span className='hidden md:inline'>&nbsp;&mdash;&nbsp;</span>
              <FormattedMessage
                id='page.year-in-review.2021.section.partnerships.other-partnerships.vegan-outreach.paragraph'
                defaultMessage="We partnered with <no-localization>Vegan Outreach's</no-localization> Vegan Mentorship Program in order to provide completely free mentorship access to all <no-localization>Vegan Bootcamp</no-localization> and <no-localization>3Movies.org</no-localization> participants."
              />
            </p>
            <p className='pb-20'>
              <CustomLink href='https://www.legalimpactforchickens.org/'>
                <span className='block md:inline'>
                  <b>
                    <FormattedMessage
                      id='page.year-in-review.2021.section.partnerships.other-partnerships.legal-impact-for-chickens.heading'
                      defaultMessage='<no-localization>Legal Impact for Chickens</no-localization>'
                    />
                  </b>
                </span>
              </CustomLink>
              <span className='hidden md:inline'>&nbsp;&mdash;&nbsp;</span>
              <FormattedMessage
                id='page.year-in-review.2021.section.partnerships.other-partnerships.legal-impact-for-chickens.paragraph'
                defaultMessage="We partnered with <no-localization>Legal Impact for Chickens</no-localization> for our upcoming project, <no-localization>Start Pressuring!</no-localization> We'll be able to provide successful pressure campaigns launched on our platform with free legal support!"
              />
            </p>
          </Partnership>
        </div>
      </SectionContainer>
      <SquareField
        className='hidden md:block'
        squares={[
          { color: 'grey-background', left: 0, bottom: 0 },
          { color: 'white', left: 32, top: 0 },
          { color: 'grey-background', right: 0, bottom: 0 },
          { color: 'white', right: 0, top: 0 },
        ]}
      />
    </>
  );
};

export default Partnerships;
