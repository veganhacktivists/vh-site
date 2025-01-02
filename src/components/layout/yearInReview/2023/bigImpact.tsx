import React from 'react';

import SquareField from '../../../decoration/squares';
import { SectionHeader } from '../../../decoration/textBlocks';
import TeamBlock from '../teamBlock';

import getServerIntl from 'app/intl';

import Apple from '~images/yearInReview/2023/fruit-and-vegetables/apple.png';
import Avocado from '~images/yearInReview/2023/fruit-and-vegetables/avocado.png';
import Banana from '~images/yearInReview/2023/fruit-and-vegetables/banana.png';
import Blueberry from '~images/yearInReview/2023/fruit-and-vegetables/blueberry.png';
import Brocolli from '~images/yearInReview/2023/fruit-and-vegetables/brocolli.png';
import Peach from '~images/yearInReview/2023/fruit-and-vegetables/peach.png';

interface Props {
  locale: string;
}

const BigImpact: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        squares={[
          { size: 16, right: 0, top: 0, color: 'grey-light' },
          { size: 16, left: 0, bottom: 0, color: 'grey-light' },
          { size: 16, left: 0, top: 0, color: 'grey' },
        ]}
        className='hidden md:block z-10'
      />
      <div className='bg-grey-dark pt-16 pb-1 md:pb-6 md:pt-24 px-5 md:px-10'>
        <div className='max-w-6xl mx-auto'>
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.year-in-review.2023.section.big-impact.heading',
              defaultMessage: 'Minor actions with <b>BIG IMPACT</b>',
            })}
            className='text-white'
          />
        </div>
        <div className='max-w-4xl mx-auto mb-20 pt-10'>
          <TeamBlock
            team={intl.formatMessage({
              id: 'page.year-in-review.2023.section.big-impact.501c3.heading',
              defaultMessage:
                'We’re becoming a <no-localization>501(c)3</no-localization>!',
            })}
            image={Peach}
            color='orange'
          >
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.big-impact.501c3.content',
              defaultMessage:
                'In 2023, we took a big step and initiated the process to obtain <no-localization>501(c)(3)</no-localization> status in the United States. This change promises to open up new opportunities for our organization to grow and make an even greater impact!',
            })}
          </TeamBlock>
          <TeamBlock
            team={intl.formatMessage({
              id: 'page.year-in-review.2023.section.big-impact.wellness-survey.heading',
              defaultMessage:
                '<no-localization>VH’s</no-localization> Wellness Survey',
            })}
            image={Apple}
            color='red'
          >
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.big-impact.wellness-survey.content',
              defaultMessage:
                'Activists are prone to burnout, so we conducted a survey to better support our team. It revealed that while many team members enjoy their work and feel supported by their managers, they balance work and life differently. The survey highlighted areas for improvement, such as better work guidance, collaboration opportunities, and access to mental health resources, as well as a need for more community-building and feedback on how each member’s work impacts the organization.',
            })}
          </TeamBlock>
          <TeamBlock
            team={intl.formatMessage({
              id: 'page.year-in-review.2023.section.big-impact.all-hands-meeting.heading',
              defaultMessage: 'Our First All Hands Meeting',
            })}
            image={Banana}
            color='yellow'
          >
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.big-impact.all-hands-meeting.content',
              defaultMessage:
                'In 2023, we held our very first All Hands meeting, where we established objectives aimed at improving our capacity-building services, reflected on our progress, and discussed ways to run our teams at a sustainable, collaboration-focused pace.',
            })}
          </TeamBlock>
          <TeamBlock
            team={intl.formatMessage({
              id: 'page.year-in-review.2023.section.big-impact.new-comms-manager.heading',
              defaultMessage: 'New Community Manager',
            })}
            image={Avocado}
            color='green-light'
          >
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.big-impact.new-comms-manager.content',
              defaultMessage:
                'In 2023, we welcomed <no-localization>Jess</no-localization> as our new Community Director at <no-localization>Vegan Hacktivists</no-localization>. With a decade of nonprofit experience and a passion for animal advocacy, <no-localization>Jess</no-localization> has proven to be perfectly suited to lead and expand Playground, our community of vegan volunteers. They’ve quickly become not only an integral part of <no-localization>Playground’s</no-localization> revamp but also a cherished member of our team.',
            })}
          </TeamBlock>
          <TeamBlock
            team={intl.formatMessage({
              id: 'page.year-in-review.2023.section.big-impact.new-advisor.heading',
              defaultMessage: 'New Advisor',
            })}
            image={Blueberry}
            color='blue'
          >
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.big-impact.new-advisor.content',
              defaultMessage:
                "We warmly welcomed <no-localization>Abigail Penny</no-localization>, the Executive Director of <no-localization>Animal Equality UK</no-localization>, to our advisory board this year. Her leadership has led to mainstream media attention and significant changes for farmed animals in the UK. <no-localization>Abigail's</no-localization> expertise holds tremendous value as she joins other leaders to guide our efforts toward a better world for animals.",
            })}
          </TeamBlock>
          <TeamBlock
            team={intl.formatMessage({
              id: 'page.year-in-review.2023.section.big-impact.new-comms-director.heading',
              defaultMessage: 'New Director of Communications',
            })}
            image={Brocolli}
            color='green'
          >
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.big-impact.new-comms-director.content',
              defaultMessage:
                "This year we also welcomed <no-localization>Gabrielė</no-localization>, our new Communications Director, to the team. Bringing in her background in comms and experience in campaign work, <no-localization>Gabrielė</no-localization> quickly re-adjusted to the realm of capacity building. Besides creating content for <no-localization>Vegan Hacktivists</no-localization> and <no-localization>Violet Studios</no-localization>, she's also helping other advocates strengthen their skills in communications and social media.",
            })}
          </TeamBlock>
        </div>
      </div>
    </>
  );
};

export default BigImpact;
