import SquareField from 'components/decoration/squares';
import { DarkButton } from 'components/decoration/buttons';
import { SectionHeader } from 'components/decoration/textBlocks';
import CustomImage from 'components/decoration/customImage';
import getServerIntl from 'app/intl';

import TechAndDataImg from '~images/yearInReview/2023/tech--and-data-in-the-movement.jpg';

const TOP_DECORATION_SQUARES = [
  { color: 'grey-darker', size: 16, right: 0, top: 0 },
  { color: 'grey', size: 16, right: 0, bottom: 0 },
  { color: 'white', size: 16, left: 0, top: 0 },
];

interface Props {
  locale: string;
}

const TechAndData: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  const buttonLabel = intl.formatMessage({
    id: 'page.year-in-review.2023.section.tech-and-data.label',
    defaultMessage: 'Check it out here',
  });

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <div className='flex flex-col md:flex-row text-left bg-[#DDDDDD]'>
        <div className='basis-full md:basis-1/2 flex justify-center md:justify-end pt-16 md:py-24 px-5 md:px-10'>
          <div className='flex-grow max-w-xl flex items-start justify-center md:justify-end'>
            <CustomImage
              alt='Tech and Data report graphic'
              src={TechAndDataImg}
            />
          </div>
        </div>
        <div className='basis-full md:basis-1/2 flex justify-center md:justify-start pt-10 pb-16 md:py-24 px-5 md:px-10'>
          <div className='flex-grow max-w-xl flex justify-center'>
            <div>
              <SectionHeader
                header={intl.formatMessage({
                  id: 'page.year-in-review.2023.section.tech-and-data.heading',
                  defaultMessage:
                    'The launch of <b>TECH & DATA IN THE MOVEMENT</b>',
                })}
                stackEntries
              />
              <div className='text-lg pt-8 pb-4'>
                {intl.formatMessage(
                  {
                    id: 'page.year-in-review.2023.section.tech-and-data.content',
                    defaultMessage:
                      'In August 2023, we took a significant step forward by releasing a comprehensive report on the integration of technology and data within the animal advocacy movement. Our 50-page study revealed critical insights into how technology is currently utilized and the potential it holds to further our cause. We delved into various aspects including workforce tech skills, the use of websites and applications, social media strategies, data collection practices, and security measures.<no-localization>{break}{break}</no-localization>Our findings underscore the necessity for a more tech-savvy approach in our activities and advocacy. To aid in this transition, we have formulated several recommendations aimed at leaders, activists, and funders. These guidelines are designed to foster a more technology-forward and data-driven approach, enhancing our effectiveness in animal protection.<no-localization>{break}{break}</no-localization>By sharing these insights and recommendations, we aim to catalyze a shift towards better utilization of technology across the movement. This report is not just a reflection of where we stand, but a roadmap for where we need to go, ensuring we leverage every tool available to advocate for animal welfare more efficiently.<no-localization>{break}{break}</no-localization><b>Haven’t read the study yet?</b>',
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
                  href='/tech-and-data-in-the-movement.pdf'
                  newTab
                >
                  {buttonLabel}
                </DarkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TechAndData;
