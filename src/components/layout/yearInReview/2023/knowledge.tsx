import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';
import CustomImage from 'components/decoration/customImage';
import getThemeColor from 'lib/helpers/theme';
import Sprite, { chicken } from 'components/decoration/sprite';
import getServerIntl from 'app/intl';

import Erasmus from '~images/yearInReview/2023/erasmus.jpg';
import LeadConference from '~images/yearInReview/2023/lead-conference.jpg';
import AvaSummit from '~images/yearInReview/2023/ava-summit.jpg';

const TOP_DECORATION_SQUARES = [
  { color: 'white', size: 16, right: 0, top: 0 },
  { color: 'grey-dark', size: 16, left: 0, bottom: 0 },
  { color: 'grey-light', size: 16, left: 0, top: 0 },
];

interface ItemProps {
  children: React.ReactNode;
  color: string;
  heading: React.ReactNode;
  image?: JSX.Element;
  colSpan?: number;
  hasSubGrid?: boolean;
}

const Item = ({
  children,
  color,
  heading,
  image,
  colSpan = 1,
  hasSubGrid = true,
}: ItemProps) => (
  <div
    style={{
      //I had to use styles as Tailwind wasn't accepting the border colors
      borderTop: `18px solid ${getThemeColor(color)}`,
    }}
    className={`col-span-${colSpan} text-lg text-left grid${
      hasSubGrid
        ? ' grid-rows-[auto_min-content_1fr]'
        : image
          ? ''
          : ' grid-rows-[min-content_1fr]'
    }`}
  >
    {image ? <div>{image}</div> : ''}
    <div className='bg-white font-mono text-3xl text-balance'>
      <div className='p-5'>{heading}</div>
    </div>
    <div className={`bg-grey-lighter p-5${image ? '' : ' row-span-2'}`}>
      {children}
    </div>
  </div>
);

interface Props {
  locale: string;
}

const Knowledge: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <div className='bg-grey-dark py-16 md:py-24 px-5 md:px-10'>
        <div className='max-w-6xl mx-auto'>
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.year-in-review.2023.section.knowledge.intro.heading',
              defaultMessage: 'Sharing & gaining for <b>Knowledge</b>',
            })}
            className='text-white'
          />
          <div className='text-lg text-white pt-5 pb-10'>
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.knowledge.intro.content',
              defaultMessage:
                'Our year was highlighted by events where we sought knowledge and impact in different regions and areas in the space. We gave talks about best practices for managing volunteers, and the foundations of leveraging AI to advance our advocacy. We also seized the opportunity to strengthen connections, and acquire more skills in leading and growing our organization.',
            })}
          </div>
          <div className='flex flex-col lg:grid grid-cols-3 gap-10 lg:gap-5'>
            <Item
              color='green'
              hasSubGrid={false}
              heading={intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.making-connections.heading',
                  defaultMessage: 'Making Connections: <b>CARE Conference</b>',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.making-connections.content',
                  defaultMessage:
                    'Towards the end of summer 2023, we attended the <no-localization>CARE Conference</no-localization> in Warsaw, Poland, where <no-localization>David</no-localization> spoke with over 40 organizations. Additionally, we enriched our knowledge in digital marketing at a session led by <no-localization>Ana Bradley</no-localization>, Executive Director at <no-localization>Sentient Media</no-localization>, where <no-localization>VH</no-localization> was recognized for our partnership in implementing technical SEO changes!',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Item>
            <Item
              color='yellow'
              hasSubGrid={false}
              heading={intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.ava-summit.heading',
                  defaultMessage:
                    'Recognizing Volunteers as Catalysts: <b>AVA Summit in LA</b>',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
              image={
                <CustomImage
                  className='w-full'
                  alt={intl.formatMessage({
                    id: 'page.year-in-review.2023.section.knowledge.ava-summit.image.alt',
                    defaultMessage: 'VH team at the AVA Summit in LA',
                  })}
                  src={AvaSummit}
                />
              }
              colSpan={2}
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.ava-summit.content',
                  defaultMessage:
                    'We also attended the <no-localization>AVA Summit</no-localization> in <no-localization>LA</no-localization>, where <no-localization>David</no-localization> shared his insights on volunteer management and empowerment in the movement. He highlighted how volunteers amplify our impact and discussed the importance of branding, clarity, and setting expectations for attracting top volunteers. Board Members <no-localization>Ryuji Chua</no-localization> and <no-localization>Seb Alex</no-localization> gave talks on mass communication and advocacy in the Middle East. At the Summit, we collaborated with <no-localization>Andrea Gunn</no-localization> and <no-localization>David Coman-Hidy</no-localization> from <no-localization>Sharpen Strategy</no-localization> to refine our strategy and operating model, addressing uncertainties and potential pivots. Additionally, we co-hosted a career fair with <no-localization>Animal Advocacy Careers</no-localization>!',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Item>
            <Item
              color='yellow-orange'
              heading={intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.lead-conference.heading',
                  defaultMessage:
                    'Thriving in an Organization: <b>LEAD Conference</b>',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
              image={
                <CustomImage
                  className='w-full'
                  alt={intl.formatMessage({
                    id: 'page.year-in-review.2023.section.knowledge.lead-conference.image.alt',
                    defaultMessage: 'Photo from the LEAD conference',
                  })}
                  src={LeadConference}
                />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.lead-conference.content',
                  defaultMessage:
                    'In summer 2023, <no-localization>David</no-localization> and board members <no-localization>Seb Alex</no-localization> and <no-localization>Ryuji Chua</no-localization> attended the <no-localization>LEAD</no-localization> conference. They joined a workshop that revealed six core needs of people in organizations. These needs neatly fit into the acronym <no-localization>"BICEPS"</no-localization>, as pictured above!',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Item>
            <Item
              color='orange'
              heading={intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.liberation-conference.heading',
                  defaultMessage:
                    'The Path to Effective Communication: <b>Animal Liberation Conference</b>',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.liberation-conference.content',
                  defaultMessage:
                    "In Berkeley, CA, our Board Director <no-localization>Ryuji Chua</no-localization> spoke at the world's largest grassroots animal rights conference. His workshop, 'How to Talk about Animal Rights: Principles of Effective Communication for Educators & Content Creators', explored how to create engaging media, capture and retain attention, and offer an alternative perspective on the world in an engaging and memorable way.",
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Item>
            <Item
              color='red'
              heading={intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.asia-farm.heading',
                  defaultMessage:
                    'Ensuring Our Support in Asia: <b>Asia Farm Animal Day</b>',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.asia-farm.content',
                  defaultMessage:
                    'Towards the end of 2023, <no-localization>David van Beveren</no-localization>, <no-localization>Ryuji Chua</no-localization>, and <no-localization>Seb Alex</no-localization> attended the first in-person <no-localization>Asia Farm Animal Day</no-localization> in Kuala Lumpur, co-organized by the Asia for <no-localization>Animals Farm Animal Coalition</no-localization> and the <no-localization>Animal & Vegan Advocacy Summit</no-localization>. We spoke with organizations dedicated to animal protection in Asia and ensured that our capacity-building services are within their reach. Additionally, board Director <no-localization>Ryuji Chua</no-localization> served as the opening keynote speaker and shared tips on effective communication!',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Item>
            <Item
              color='pink'
              heading={intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.aquatic-life-con.heading',
                  defaultMessage:
                    'Leveraging AI for Aquatic Animals: <b>Aquatic Life Conference</b>',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.aquatic-life-con.content',
                  defaultMessage:
                    'At the 4th <no-localization>Annual Aquatic Life Conference</no-localization>, organized by the <no-localization>Aquatic Life Institute</no-localization>, our Executive Director <no-localization>James Morgan</no-localization> discussed using <no-localization>ChatGPT</no-localization> for aquatic life protection. In his talk, <no-localization>James</no-localization> outlined AI definitions, its opportunities in animal advocacy, and the risks and limitations associated with AI use. You can watch the talk <a>right here</a>.',
                },
                {
                  a: (chunks) => (
                    <a
                      href='https://www.youtube.com/watch?v=EYgys5ay67A&t=2900s'
                      target='_blank'
                      rel='noreferrer'
                      className='underline'
                    >
                      {chunks}
                    </a>
                  ),
                },
              )}
            </Item>
            <Item
              color='purple'
              heading={intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.farm.heading',
                  defaultMessage:
                    'Uncovering the Merits and Risks of AI: <b>Interview with FARM</b>',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.farm.content',
                  defaultMessage:
                    'In 2023, our Executive Director <no-localization>James Morgan</no-localization> took a balanced look at using AI in advocacy work during an interview with the <no-localization>Farm Animal Rights Movement (FARM)</no-localization>. He talked about AI’s merits and pitfalls, encouraged advocates to use AI tools in daily tasks, and highlighted how AI can boost the efficiency and effectiveness of our efforts. You can watch the interview right here.',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Item>
            <Item
              color='blue'
              heading={intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.erasmus.heading',
                  defaultMessage:
                    'Why Wild Animal Suffering Matters: <b>Erasmus University Rotterdam</b>',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
              image={
                <CustomImage
                  className='w-full'
                  alt={intl.formatMessage({
                    id: 'page.year-in-review.2023.section.knowledge.erasmus.image.alt',
                    defaultMessage: 'Photo of James at Erasmus',
                  })}
                  src={Erasmus}
                />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2023.section.knowledge.erasmus.content',
                  defaultMessage:
                    "In spring, <no-localization>James Morgan</no-localization> spoke about wild animal suffering at <no-localization>Erasmus University</no-localization> in Rotterdam, thanks to <no-localization>PISE</no-localization> Rotterdam, a student group aligned with <no-localization>Effective Altruism</no-localization>! We're incredibly grateful for the opportunity, and the insightful questions the students raised during the discussion.",
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Item>
          </div>
        </div>
      </div>
      <Sprite image={chicken} />
    </>
  );
};
export default Knowledge;
