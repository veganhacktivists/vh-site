import React from 'react';

import AnimatedNumber from '../../../decoration/animatedNumber';
import { SectionHeader } from '../../../decoration/textBlocks';

import ByTheNumbersTooltip from './byTheNumbersTooltip';

import SquareField from 'components/decoration/squares';
import getServerIntl from 'app/intl';

const TOP_DECORATION_SQUARES = [
  { color: 'grey-dark', size: 16, right: 0, top: 0 },
];

interface StatProps {
  children: React.ReactNode;
  color?: string;
  isHeading?: boolean;
  toolTipText?: React.ReactNode;
}

const Stat = ({ children, color, isHeading = false }: StatProps) => (
  <div
    className={`font-mono relative pb-2 ${
      isHeading ? 'text-4xl md:text-6xl lg:pb-5' : 'text-3xl md:text-4xl'
    }${color ? ' text-' + color : ''}`}
  >
    {children}
  </div>
);

interface Props {
  locale: string;
}

const ByTheNumbers: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  const learnMoreLabel = intl.formatMessage({
    id: 'page.year-in-review.2023.section.by-the-numbers.learn-more',
    defaultMessage: 'Learn more',
  });

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <div className='pt-16 pb-12 md:pt-24 md:pb-20 px-5 md:px-10'>
        <SectionHeader
          header={intl.formatMessage({
            id: 'page.year-in-review.2023.section.by-the-numbers.heading',
            defaultMessage: '<b>By the numbers</b>',
          })}
        />
        <div className='pb-10'>
          <Stat color={'green'} isHeading={true}>
            <AnimatedNumber
              className='text-4xl md:text-6xl'
              number={133}
              suffix={' '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.services.heading',
              defaultMessage: 'Organizations Served',
            })}
          </Stat>
          <Stat>
            <AnimatedNumber
              className='text-3xl md:text-4xl'
              number={25}
              suffix={' '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.services.1',
              defaultMessage: 'BIPGM-led',
            })}
            <ByTheNumbersTooltip
              linkUrl='https://faunalytics.org/glossary/'
              learnMoreLabel={learnMoreLabel}
            >
              {intl.formatMessage({
                id: 'page.year-in-review.2023.section.by-the-numbers.services.1.tooltip',
                defaultMessage:
                  'BIPGM stands for Black, Indigenous, and People of the Global Majority.',
              })}
            </ByTheNumbersTooltip>
          </Stat>
          <Stat>
            <AnimatedNumber
              className='text-3xl md:text-4xl'
              number={29}
              suffix={' '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.services.2',
              defaultMessage: 'EA-aligned',
            })}
            <ByTheNumbersTooltip
              learnMoreLabel={learnMoreLabel}
              linkUrl='https://www.effectivealtruism.org/articles/cause-profile-animal-welfare'
            >
              {intl.formatMessage({
                id: 'page.year-in-review.2023.section.by-the-numbers.services.2.tooltip',
                defaultMessage:
                  'EA stands for Effective Altruism – groups who are focused on animal welfare.',
              })}
            </ByTheNumbersTooltip>
          </Stat>
          <Stat>
            <AnimatedNumber
              className='text-3xl md:text-4xl'
              number={50}
              suffix={'+ '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.services.3',
              defaultMessage: 'Different countries',
            })}
          </Stat>
          <Stat>
            <AnimatedNumber
              className='text-3xl md:text-4xl'
              number={220}
              suffix={' '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.services.4',
              defaultMessage: 'Services provided',
            })}
          </Stat>
        </div>
        <div className='pb-10'>
          <Stat color={'yellow-orange'} isHeading={true}>
            <AnimatedNumber
              prefix={'$'}
              suffix={'+'}
              className='text-4xl md:text-6xl'
              number={750}
            />{' '}
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.cost-saved.heading',
              defaultMessage: 'Saved for the Movement',
            })}
          </Stat>
          <Stat>
            <AnimatedNumber
              className='text-3xl md:text-4xl'
              number={526}
              prefix={'$'}
              suffix={'k '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.cost-saved.1',
              defaultMessage: 'Minimum',
            })}
          </Stat>
          <Stat>
            <AnimatedNumber
              className='text-3xl md:text-4xl'
              number={752}
              prefix={'$'}
              suffix={'k '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.cost-saved.2',
              defaultMessage: 'On Average',
            })}
          </Stat>
          <Stat>
            <AnimatedNumber
              className='text-3xl md:text-4xl'
              number={978}
              prefix={'$'}
              suffix={'k '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.cost-saved.3',
              defaultMessage: 'Maximum',
            })}
          </Stat>
        </div>
        <div>
          <Stat color={'magenta'} isHeading={true}>
            {intl.formatMessage(
              {
                id: 'page.year-in-review.2023.section.by-the-numbers.grant-program.heading',
                defaultMessage: '<b>Grant</b> Program',
              },
              {
                b: (chunks) => <b>{chunks}</b>,
              },
            )}
          </Stat>
          <Stat>
            <AnimatedNumber
              className='text-3xl md:text-4xl'
              number={126}
              suffix={' '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.grant-program.1',
              defaultMessage: 'Applicants',
            })}
          </Stat>
          <Stat>
            <AnimatedNumber
              className='text-3xl md:text-4xl'
              number={30}
              suffix={' '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.grant-program.2',
              defaultMessage: 'Applications approved',
            })}
          </Stat>
          <Stat>
            <AnimatedNumber
              className='text-3xl md:text-4xl'
              number={39}
              suffix={'k '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.grant-program.3',
              defaultMessage: 'Given in seed grants',
            })}
          </Stat>
        </div>
      </div>
    </>
  );
};
export default ByTheNumbers;
