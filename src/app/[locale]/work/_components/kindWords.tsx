import Sprite, { cow } from 'components/decoration/sprite';
import SquareField from 'components/decoration/squares';
import getThemeColor from 'lib/helpers/theme';
import getServerIntl from 'app/intl';

import type { IntlShape } from 'react-intl';

const BOTTOM_DECORATION_SQUARES = [
  {
    bottom: 0,
    left: 0,
    color: '#BCBCBC',
    size: 16,
  },
  {
    bottom: 0,
    right: 0,
    color: '#DDDDDD',
    size: 16,
  },
];

interface QuoteProps {
  author: string;
  company: string;
  color?: string;
  children: string;
}

const Quote = ({ author, company, children, color }: QuoteProps) => {
  return (
    <div
      className='text-left border-l-8 pl-9'
      style={{
        borderColor: color,
      }}
    >
      <div className='italic mb-4'>{children}</div>
      <div className='font-bold'>{author}</div>
      <div>{company}</div>
    </div>
  );
};

const getQuotes: (intl: IntlShape) => QuoteProps[] = (intl) => [
  {
    company: intl.formatMessage({
      id: 'page.our-work.section.kind-words[0].company',
      defaultMessage: '<no-localization>Mercy for Animals</no-localization>',
    }),
    author: intl.formatMessage({
      id: 'page.our-work.section.kind-words[0].author',
      defaultMessage: '<no-localization>Courtney Dillard</no-localization>',
    }),
    children: intl.formatMessage({
      id: 'page.our-work.section.kind-words[0].content',
      defaultMessage:
        'What impresses me most about the <no-localization>Vegan Hacktivists</no-localization> is their high level of critical thinking in terms of ideation and their consistent follow through. This has resulted in several high level deliverables I have been able to use and highly recommended to others.',
    }),
  },
  {
    company: intl.formatMessage({
      id: 'page.our-work.section.kind-words[1].company',
      defaultMessage:
        '<no-localization>Compassion In World Farming</no-localization>',
    }),
    author: intl.formatMessage({
      id: 'page.our-work.section.kind-words[1].author',
      defaultMessage: '<no-localization>Ben Williamson</no-localization>',
    }),
    children: intl.formatMessage({
      id: 'page.our-work.section.kind-words[1].content',
      defaultMessage:
        'I’m really excited by the potential <no-localization>Vegan Hacktivists</no-localization> have for the animal protection movement. Progress is full of tipping points, and I’m sure at least one of these lives within a technological solution offered by this skilled community of advocates.',
    }),
  },
  {
    company: intl.formatMessage({
      id: 'page.our-work.section.kind-words[2].company',
      defaultMessage:
        '<no-localization>The Pollination Project</no-localization>',
    }),
    author: intl.formatMessage({
      id: 'page.our-work.section.kind-words[2].author',
      defaultMessage: '<no-localization>AJ Dahiya</no-localization>',
    }),
    children: intl.formatMessage({
      id: 'page.our-work.section.kind-words[2].content',
      defaultMessage:
        '<no-localization>Vegan Hacktivists</no-localization> is an innovative organization leveraging technology to make a large-scale impact for the rights and dignity of animals. They have gone above and beyond in supporting our organization with their expertise. Their work is extremely needed and on the cutting edge for the time we live in.',
    }),
  },
  {
    company: intl.formatMessage({
      id: 'page.our-work.section.kind-words[3].company',
      defaultMessage: '<no-localization>Faunalytics</no-localization>',
    }),
    author: intl.formatMessage({
      id: 'page.our-work.section.kind-words[3].author',
      defaultMessage: '<no-localization>Brooke Haggerty</no-localization>',
    }),
    children: intl.formatMessage({
      id: 'page.our-work.section.kind-words[3].content',
      defaultMessage:
        '<no-localization>Vegan Hacktivists</no-localization> is a hidden gem in the animal protection movement. They are capacity builders, dedicated to supporting other animal advocates. We’ve been fortunate enough to receive their help with several behind the scenes projects, and I’m constantly impressed with their passion and professionalism.',
    }),
  },
];

const quoteColors = [
  getThemeColor('broccoli'),
  getThemeColor('carrot'),
  getThemeColor('banana'),
  getThemeColor('watermelon'),
];

interface KindWordsProps {
  locale: string;
}

const KindWords: React.FC<KindWordsProps> = ({ locale }: KindWordsProps) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <div className='relative w-full overflow-hidden text-xl bg-white pb-10'>
        <div className='relative flex flex-col px-2 py-20 mx-auto w-3/4 gap-y-8'>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-32 gap-y-20'>
            {getQuotes(intl).map((quote, i) => (
              <Quote key={quote.author} {...quote} color={quoteColors[i]} />
            ))}
          </div>
        </div>
      </div>

      <Sprite image={cow} pixelsLeft={1} pixelsRight={1} />

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className='hidden md:block'
      />
    </>
  );
};

export default KindWords;
