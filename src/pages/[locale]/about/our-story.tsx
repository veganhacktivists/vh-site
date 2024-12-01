import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  FirstSubSection,
  SubSection,
} from '../../../components/decoration/textBlocks';
import AboutLayout from '../../../components/layout/about';
import { pixelPig } from '../../../images/separators';

import CustomImage from 'components/decoration/customImage';

import type PageWithLayout from '../../../types/persistentLayout';

const OurStory: PageWithLayout = () => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.about.section.our-story.next-seo.title',
          defaultMessage: 'Our Story',
        })}
      />
      <FirstSubSection
        header={intl.formatMessage({
          id: 'page.about.section.our-story.intro.heading',
          defaultMessage: 'Our <b>story</b>',
        })}
      >
        <FormattedMessage
          id='page.about.section.our-story.intro.paragraph'
          defaultMessage='In 2019, we launched our first project with a few volunteers who were passionate about activism. We’ve since grown into a community of highly-skilled and professional software engineers, designers, data scientists, and content creators supporting the movement. We started with the hopes of catalyzing people to action and inspiring them to become advocates for animals — and we are committed to this founding principle. Our digital skills fuel our activism.'
        />
      </FirstSubSection>
      <div className='pb-10 m-10'>
        <div className='pb-5'>
          <CustomImage
            src={pixelPig}
            width={pixelPig.width / 3}
            height={pixelPig.height / 3}
            alt={intl.formatMessage({
              id: 'page.about.section.our-story.image.alt-text',
              defaultMessage: 'Our story',
            })}
          />
        </div>
        <SubSection>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.0'
            defaultMessage='We are the <no-localization>Vegan Hacktivists</no-localization>. Our skill sets — whether it’s writing code, creating a brand identity, or analyzing data — are as diverse as the areas where we come from and where we live. We collaborate with each other to build projects that are data-driven, experimental, and effective. Our core team consists of director and senior-level team members who have experience and expertise in engineering, architecture, design, data, operations, and communications. Our volunteer base consists of teams managed by leads; each team has ownership of a project in which they are actively building and maintaining.'
          />
        </SubSection>
        <SubSection>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.1'
            defaultMessage='Our organization takes a community-first approach. Given that our work requires patience and commitment, we energize our volunteers by creating a supportive environment that enables them to be engaged, effective, and impactful. As a distributed organization, we want to build a sense of community aligned by values and connected through meaningful and playful interactions. Each team is represented with a <link>fruit or vegetable</link> (taking plant-based to another level), and we balance our work with games, get-togethers, and community calls. Our volunteers are, after all, at the heart of our organization.'
            values={{
              link: (chunks) => (
                <Link
                  href={`/${intl.locale}/people/team`}
                  className='hover:text-grey'
                >
                  {chunks}
                </Link>
              ),
            }}
          />
        </SubSection>
        <SubSection>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.2'
            defaultMessage='Over the years, our organization has changed with the needs of our movement. While we now primarily focus on providing capacity-building services, we continue to build technology that we believe to be innovative and highly needed in the movement. Now, we work extensively with advocates, organizations, and those working at the frontlines to help improve their day-to-day operations, brand and identity, and technology. In doing so, we are helping to amplify their message and elevate their work to a wider audience.'
          />
        </SubSection>
        <SubSection>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.3'
            defaultMessage='Through it all, our North Star remains the same: <no-localization>{break}</no-localization> we do it for the animals.'
            values={{
              break: <br />,
            }}
          />
        </SubSection>
      </div>
    </>
  );
};

OurStory.Layout = AboutLayout;

export default OurStory;
