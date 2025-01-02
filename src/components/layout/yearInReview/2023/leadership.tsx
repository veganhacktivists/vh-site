import { DarkButton } from 'components/decoration/buttons';
import { SectionHeader } from 'components/decoration/textBlocks';
import CustomImage from 'components/decoration/customImage';
import getServerIntl from 'app/intl';

import LeadershipPigs from '~images/yearInReview/2023/leadership-pigs.jpg';

interface Props {
  locale: string;
}

const Leadership: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  const buttonLabel = intl.formatMessage({
    id: 'page.year-in-review.2023.section.leadership.label',
    defaultMessage: 'Read the Announcement',
  });

  return (
    <>
      <div className='flex flex-col md:flex-row text-left bg-white'>
        <div className='basis-full md:basis-1/2 flex justify-center md:justify-end pt-16 md:py-24 px-5 md:px-10'>
          <div className='flex-grow max-w-xl flex justify-center'>
            <div>
              <SectionHeader
                header={intl.formatMessage({
                  id: 'page.year-in-review.2023.section.leadership.heading',
                  defaultMessage: 'New horizons in <b>OUR LEADERSHIP</b>',
                })}
                stackEntries
              />
              <div className='text-lg pt-8 pb-4'>
                {intl.formatMessage(
                  {
                    id: 'page.year-in-review.2023.section.leadership.content',
                    defaultMessage:
                      "Mid-summer this year, we decided to refine the way we build capacity with changes in our leadership. <no-localization>David van Beveren</no-localization>, who founded <no-localization>Vegan Hacktivists</no-localization> in 2019, transitioned to the role of Founder and President, now overseeing the organization's long-term vision and broader impact.<no-localization>{break}{break}</no-localization>Under <no-localization>David’s</no-localization> guidance <no-localization>Vegan Hacktivists</no-localization> grew significantly: what started as a one-person team turned into an organization of over 50 active volunteers, 4 full-time employees, 8 stipend volunteers, and 2,500 volunteers within our <no-localization>Playground</no-localization> network. Since the transition, <no-localization>David</no-localization> has been focusing on the overall direction and strategy, building partnerships and representing the organization in various events and capacities.<no-localization>{break}{break}</no-localization>On the other side of the exchange, <no-localization>James Morgan</no-localization> stepped up as our new Executive Director, bringing his commitment to the cause and expertise in product management to the forefront of our operations. Since joining <no-localization>VH</no-localization>, <no-localization>James</no-localization> has played a pivotal role in enhancing our processes and supporting our growth, originally starting as a volunteer and quickly becoming indispensable as our Director of Operations. He helped lay the foundation of what <no-localization>VH</no-localization> is today, and now, both of our leaders continue to work in synergy to advance our mission and support the movement with innovative tech solutions, strengthening advocacy for animals worldwide.<no-localization>{break}{break}</no-localization><b>First time hearing the news?</b>",
                  },
                  {
                    b: (chunks) => <b>{chunks}</b>,
                    break: <br />,
                  },
                )}
              </div>
              <div className='flex flex-row justify-between mt-4'>
                <DarkButton
                  capitalize={false}
                  className='md:max-w-72 h-fit'
                  href='/blog/new-horizons-for-vh-leadership'
                  newTab
                >
                  {buttonLabel}
                </DarkButton>
              </div>
            </div>
          </div>
        </div>
        <div className='basis-full md:basis-1/2 flex justify-center md:justify-start items-center pt-10 pb-16 md:py-24 px-5 md:px-10'>
          <div className='max-w-xl relative'>
            <div className='absolute bg-orange-dark w-10 h-10 lg:w-20 lg:h-20 bottom-0 left-0' />
            <div className='absolute bg-pink w-10 h-10 lg:w-20 lg:h-20 bottom-10 lg:bottom-20 left-0' />
            <div className='absolute bg-orange w-10 h-10 lg:w-20 lg:h-20 bottom-0 left-10 lg:left-20' />
            <div className='absolute bg-orange w-10 h-10 lg:w-20 lg:h-20 top-0 right-10 lg:right-20' />
            <div className='absolute bg-yellow w-10 h-10 lg:w-20 lg:h-20 top-0 right-0' />
            <div className='absolute bg-green w-10 h-10 lg:w-20 lg:h-20 top-10 lg:top-20 right-0' />
            <CustomImage
              alt='Two pigs leaning over a wooden fence'
              src={LeadershipPigs}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Leadership;
