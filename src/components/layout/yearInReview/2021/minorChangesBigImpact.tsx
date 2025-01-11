import SquareField from '../../../decoration/squares';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';

import getServerIntl from 'app/intl';

import type { IntlShape } from 'react-intl';

interface Change {
  icon: string;
  text: React.ReactNode;
}

const getChanges: (intl: IntlShape) => Change[] = (intl) => [
  {
    icon: '🍎',
    text: intl.formatMessage({
      id: 'page.year-in-review.2021.section.big-impact.paragraph.0',
      defaultMessage: 'Created guidelines around brand, design, and content',
    }),
  },
  {
    icon: '🥝',
    text: intl.formatMessage({
      id: 'page.year-in-review.2021.section.big-impact.paragraph.1',
      defaultMessage:
        'Incorporated new technologies including <no-localization>Docker, LaravelShift, Vue, Tailwind, React, Svelte,</no-localization> and more',
    }),
  },
  {
    icon: '🌽',
    text: intl.formatMessage({
      id: 'page.year-in-review.2021.section.big-impact.paragraph.2',
      defaultMessage:
        'Introduced a system to collect regular feedback from our advisory board',
    }),
  },
  {
    icon: '🥔',
    text: intl.formatMessage({
      id: 'page.year-in-review.2021.section.big-impact.paragraph.3',
      defaultMessage:
        'Added three new courses to <no-localization>Vegan Bootcamp</no-localization>',
    }),
  },
  {
    icon: '🌶️',
    text: intl.formatMessage({
      id: 'page.year-in-review.2021.section.big-impact.paragraph.4',
      defaultMessage: 'Streamlined our volunteer application process',
    }),
  },
  {
    icon: '🥒',
    text: intl.formatMessage({
      id: 'page.year-in-review.2021.section.big-impact.paragraph.5',
      defaultMessage:
        'Presented <no-localization>Vegan Linguists</no-localization> at 2021 <no-localization>Animal Advocacy Conference</no-localization> Asia',
    }),
  },
  {
    icon: '🍊',
    text: intl.formatMessage({
      id: 'page.year-in-review.2021.section.big-impact.paragraph.6',
      defaultMessage:
        'Launched a community voting channel on our <no-localization>Discord</no-localization> server',
    }),
  },
  {
    icon: '🍋',
    text: intl.formatMessage({
      id: 'page.year-in-review.2021.section.big-impact.paragraph.7',
      defaultMessage:
        'Leveraged external platforms, such as <no-localization>Reddit</no-localization> and <no-localization>Twitter</no-localization>, to promote our services',
    }),
  },
  {
    icon: '🍍',
    text: intl.formatMessage({
      id: 'page.year-in-review.2021.section.big-impact.paragraph.8',
      defaultMessage:
        'Added localization to projects for more accurate and clearer translations',
    }),
  },
  {
    icon: '🍐',
    text: intl.formatMessage({
      id: 'page.year-in-review.2021.section.big-impact.paragraph.9',
      defaultMessage:
        'Started hosting weekly office hours for our team to chat, work, and play',
    }),
  },
];

interface Props {
  locale: string;
}

const MinorChangesBigImpact: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  const changes = getChanges(intl);

  return (
    <>
      <SquareField
        squares={[
          { color: 'black', size: 16, left: 0, bottom: 0 },
          { color: 'grey', size: 16, left: 0, top: 0 },
          { color: 'grey-light', size: 16, right: 0, bottom: 0 },
          { color: 'grey', size: 16, right: 0, top: 0 },
        ]}
        className='hidden md:block'
      />
      <SectionContainer
        circles
        color='grey-dark'
        className='text-white'
        header={
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.year-in-review.2021.section.big-impact.headline',
              defaultMessage: 'Minor changes with a <b>big impact</b>',
            })}
          />
        }
      >
        <div className='mx-auto text-2xl md:w-2/3 space-y-3 mb-10'>
          {changes.map(({ icon, text }) => (
            <div
              key={icon}
              className='flex flex-col md:flex-row gap-x-10 w-full justify-start'
            >
              <div className='text-4xl'>{icon}</div>
              <div className='md:text-left'>{text}</div>
            </div>
          ))}
        </div>
      </SectionContainer>
      <SquareField
        squares={[
          { color: 'grey', size: 16, left: 0, top: 0 },
          { color: 'grey-lighter', size: 16, right: 0, bottom: 0 },
          { color: 'grey', size: 16, right: 0, top: 0 },
        ]}
        className='hidden md:block'
      />
    </>
  );
};

export default MinorChangesBigImpact;
