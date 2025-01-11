import SquareField from 'components/decoration/squares';
import { DarkButton } from 'components/decoration/buttons';
import { SectionHeader } from 'components/decoration/textBlocks';
import CustomImage from 'components/decoration/customImage';
import getServerIntl from 'app/intl';

import GrantiScreenshot from '~images/yearInReview/2023/granti-screenshot.jpg';
import GrantiLogo from '~images/yearInReview/2023/granti.png';

const TOP_DECORATION_SQUARES = [
  { color: 'grey-darker', size: 16, left: 0, top: 0 },
];

interface Props {
  locale: string;
}

const Granti: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  const buttonLabel = intl.formatMessage({
    id: 'page.year-in-review.2023.section.granti.label',
    defaultMessage:
      'Reach our to join <no-localization>Granti</no-localization>',
  });

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <div className='flex flex-col md:flex-row text-left bg-[#DDDDDD]'>
        <div className='basis-full md:basis-1/2 flex justify-center md:justify-end pt-16 md:py-24 px-5 md:px-10'>
          <div className='flex-grow max-w-xl flex items-center justify-center'>
            <CustomImage alt='Granti screenshot' src={GrantiScreenshot} />
          </div>
        </div>
        <div className='basis-full md:basis-1/2 flex justify-center md:justify-start pt-10 pb-16 md:py-24 px-5 md:px-10'>
          <div className='flex-grow max-w-xl flex justify-center'>
            <div>
              <div className='max-w-sm pb-10'>
                <CustomImage alt='Granti logo' src={GrantiLogo} />
              </div>
              <SectionHeader
                header={intl.formatMessage({
                  id: 'page.year-in-review.2023.section.granti.heading',
                  defaultMessage: '<b>GRANT-MAKING TURNED SIMPLE</b>',
                })}
                stackEntries
              />
              <div className='text-lg pt-8 pb-4'>
                {intl.formatMessage(
                  {
                    id: 'page.year-in-review.2023.section.granti.content',
                    defaultMessage:
                      "After conducting several interviews with major funders in the space, it was clear to us that a grantee/funder tool was well-needed in our movement. We tackled this issue head-on by building a tool that would allow better management and facilitation of grants for both advocates and funders alike. We were thrilled to onboard the first funders onto the platform, and publicly announced its launch at the end of the year!<no-localization>{break}{break}</no-localization>Grantees often struggle to keep track of their grant submissions, both current and past. Funders face similar challenges, as it's rare to have all the necessary information in one easy-to-understand and accessible format. Like grantees, funders deal with a lot of administrative work and often use multiple platforms to manage submissions. Our system, <no-localization>Granti</no-localization>, brings everyone together, simplifying the grant process for all.<no-localization>{break}{break}</no-localization>Since its launch, <no-localization>Granti</no-localization> has made a huge impact, helping distribute tens of millions of dollars. <no-localization>Granti</no-localization> makes everything easier—from handling applications to updating records and managing finances. It's become a powerful tool, and we intend to extend its use far beyond what we initially envisioned.<no-localization>{break}{break}</no-localization><b>Are you a funder or grantmaker in the space? Looking for a streamlined way to manage your grants?</b>",
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
                  href='/services#contact-us'
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

export default Granti;
