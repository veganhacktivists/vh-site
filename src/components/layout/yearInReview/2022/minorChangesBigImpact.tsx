import SquareField from '../../../decoration/squares';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';

import getServerIntl from 'app/intl';

import type { IntlShape } from 'react-intl';

interface Change {
  icon: string;
  text: string;
}

const getChanges = (intl: IntlShape): Change[] => {
  return [
    {
      icon: '🥒',
      text: intl.formatMessage({
        id: 'page.year-in-review.2022.section.minor-changes-big-impact.cucumber',
        defaultMessage:
          'Designed a new UX process that drives project ideation from start to finish',
      }),
    },
    {
      icon: '🍎',
      text: intl.formatMessage({
        id: 'page.year-in-review.2022.section.minor-changes-big-impact.tomato',
        defaultMessage:
          'Featured in interviews by <no-localization>Our Hen House</no-localization>, <no-localization>Animal Justice Academy</no-localization>, and <no-localization>Vegan FTA</no-localization>',
      }),
    },
    {
      icon: '🍊',
      text: intl.formatMessage({
        id: 'page.year-in-review.2022.section.minor-changes-big-impact.tangerine',
        defaultMessage:
          'Participated in <no-localization>LEAD Conference</no-localization>, and presented at <no-localization>CARE Conference</no-localization> and <no-localization>AVA Summit</no-localization>',
      }),
    },
    {
      icon: '🥦',
      text: intl.formatMessage({
        id: 'page.year-in-review.2022.section.minor-changes-big-impact.broccoli',
        defaultMessage:
          'Utilized and launched a machine learning and artificial intelligence project',
      }),
    },
    {
      icon: '🥥',
      text: intl.formatMessage({
        id: 'page.year-in-review.2022.section.minor-changes-big-impact.coconut',
        defaultMessage:
          'Created a Communications team that handles our content, social, and marketing strategy',
      }),
    },
    {
      icon: '🍍',
      text: intl.formatMessage({
        id: 'page.year-in-review.2022.section.minor-changes-big-impact.pineapple',
        defaultMessage:
          'Expanded our services to support design requests (logo, branding, and identity)',
      }),
    },
    {
      icon: '🍇',
      text: intl.formatMessage({
        id: 'page.year-in-review.2022.section.minor-changes-big-impact.grape',
        defaultMessage:
          'Created an animation team to showcase our work and as a service to others in the movement',
      }),
    },
    {
      icon: '🍠',
      text: intl.formatMessage({
        id: 'page.year-in-review.2022.section.minor-changes-big-impact.sweet-potato',
        defaultMessage:
          'Collaborated with various <no-localization>Reddit</no-localization> communities to prominently feature <no-localization>WatchDominion.org</no-localization>',
      }),
    },
    {
      icon: '🍑',
      text: intl.formatMessage({
        id: 'page.year-in-review.2022.section.minor-changes-big-impact.peach',
        defaultMessage:
          'Developed a DevOps team to manage our servers and technical infrastructure',
      }),
    },
    {
      icon: '🥝',
      text: intl.formatMessage({
        id: 'page.year-in-review.2022.section.minor-changes-big-impact.kiwi',
        defaultMessage:
          'Launched two new blog series, Leaders in <no-localization>Animal Protection</no-localization> and <no-localization>Byte Size</no-localization>',
      }),
    },
    {
      icon: '🥬',
      text: intl.formatMessage({
        id: 'page.year-in-review.2022.section.minor-changes-big-impact.leafy-green',
        defaultMessage:
          'Created specialized roles, both among our core team and for platforms like <no-localization>Squarespace</no-localization> and <no-localization>Wordpress</no-localization>',
      }),
    },
    {
      icon: '🌽',
      text: intl.formatMessage({
        id: 'page.year-in-review.2022.section.minor-changes-big-impact.corn',
        defaultMessage:
          'Designed a book for <no-localization>Sentient Media</no-localization> and formed a partnership with its programs',
      }),
    },
    {
      icon: '🌶️',
      text: intl.formatMessage({
        id: 'page.year-in-review.2022.section.minor-changes-big-impact.chili',
        defaultMessage:
          'Connected <no-localization>Faunalytics</no-localization>, <no-localization>We Animals Media</no-localization>, <no-localization>Black Veg Society</no-localization>, and 20+ others with volunteers',
      }),
    },
    {
      icon: '🥔',
      text: intl.formatMessage({
        id: 'page.year-in-review.2022.section.minor-changes-big-impact.potato',
        defaultMessage:
          'Welcomed new advisors, <no-localization>Andrea Gunn</no-localization> and <no-localization>Christopher Eubanks</no-localization>, to our advisory board',
      }),
    },
  ];
};

interface Props {
  locale: string;
}

const MinorChangesBigImpact: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        squares={[{ color: 'grey', size: 16, right: 0, bottom: 0 }]}
        className='hidden md:block'
      />
      <SectionContainer
        circles
        color='grey-dark'
        className='text-white'
        header={
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.year-in-review.2022.section.minor-changes-big-impact.headline',
              defaultMessage: 'Minor changes with <b>big impact</b>',
            })}
          />
        }
      >
        <div className='mx-auto text-2xl md:w-2/3 space-y-3 mt-20 mb-20'>
          {getChanges(intl).map(({ icon, text }) => (
            <div
              key={icon}
              className='flex flex-col md:flex-row gap-x-2 w-full justify-start'
            >
              <div className='text-3xl'>{icon}</div>
              <div className='md:text-left'>{text}</div>
            </div>
          ))}
        </div>
      </SectionContainer>
      <SquareField
        squares={[{ color: 'grey', size: 16, left: 0, top: 0 }]}
        className='hidden md:block'
      />
    </>
  );
};

export default MinorChangesBigImpact;
