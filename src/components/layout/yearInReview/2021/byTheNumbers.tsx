import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import AnimatedNumber from '../../../decoration/animatedNumber';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';

import getServerIntl from 'app/intl';

interface NumberProps extends React.PropsWithChildren {
  number: React.ReactNode;
  header?: boolean;
}

const Number: React.FC<NumberProps> = ({
  number,
  children,
  header = false,
}) => {
  return (
    <div className={classNames({ 'w-full xl:w-1/2 2xl:w-1/3 p-5': !header })}>
      <div>
        <div>{number}</div>
        <div className=''>{children}</div>
      </div>
    </div>
  );
};

interface Props {
  locale: string;
}

const ByTheNumbers: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SectionContainer
        className='text-white uppercase'
        color='grey-darker'
        header={
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.year-in-review.2021.section.by-the-numbers.heading',
              defaultMessage: '<b>By the numbers</b>',
            })}
          />
        }
      >
        <div className='md:w-3/4 mx-auto text-left font-mono text-3xl pb-10'>
          <Number
            number={
              <AnimatedNumber
                className='text-7xl md:text-9xl text-magenta'
                number={3e6}
                approx
              />
            }
          >
            {intl.formatMessage(
              {
                id: 'page.year-in-review.2021.section.by-the-numbers.statistic.0',
                defaultMessage:
                  '<b>Total unique page views</b> for all projects',
              },
              {
                b: (chunks) => <b>{chunks}</b>,
              },
            )}
          </Number>
          <div className='flex flex-col md:flex-row flex-wrap mt-5'>
            <Number
              number={
                <AnimatedNumber number={13100} className='text-green' approx />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2021.section.by-the-numbers.statistic.1',
                  defaultMessage:
                    'Tweets by our <b>5 Minutes 5 Vegans</b> support bot',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Number>
            <Number
              number={
                <AnimatedNumber number={93432} className='text-green' approx />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2021.section.by-the-numbers.statistic.2',
                  defaultMessage:
                    'Clicks directing activists to orgs <no-localization><link>veganactivism.org</link></no-localization>',
                },
                {
                  link: (chunks) => (
                    <Link href='https://veganactivism.org'>
                      <b>{chunks}</b>
                    </Link>
                  ),
                },
              )}
            </Number>
            <Number
              number={
                <AnimatedNumber number={500000} className='text-green' approx />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2021.section.by-the-numbers.statistic.3',
                  defaultMessage:
                    'Unique page visits for <no-localization><project>Vegan Bootcamp</project></no-localization>',
                },
                {
                  project: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Number>
            <Number
              number={
                <AnimatedNumber number={21000} className='text-yellow' approx />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2021.section.by-the-numbers.statistic.4',
                  defaultMessage:
                    'Total sign ups for <no-localization><project>Vegan Bootcamp</project></no-localization>',
                },
                {
                  project: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Number>
            <Number
              number={
                <AnimatedNumber number={625} className='text-yellow' approx />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2021.section.by-the-numbers.statistic.5',
                  defaultMessage:
                    'New grassroots groups on <no-localization><project>Activist Hub</project></no-localization>',
                },
                {
                  project: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Number>
            <Number
              number={
                <AnimatedNumber number={134} className='text-yellow' approx />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2021.section.by-the-numbers.statistic.6',
                  defaultMessage:
                    'New resources added to <no-localization><project>Vegan Cheat Sheet</project></no-localization>',
                },
                {
                  project: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Number>

            <Number
              number={
                <AnimatedNumber
                  number={95}
                  className='text-orange-light'
                  approx
                />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2021.section.by-the-numbers.statistic.7',
                  defaultMessage:
                    'Groups added to <no-localization><project>Animal Rights Map</project></no-localization>',
                },
                {
                  project: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Number>
            <Number
              number={
                <AnimatedNumber
                  number={103000}
                  className='text-orange-light'
                  approx
                />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2021.section.by-the-numbers.statistic.8',
                  defaultMessage:
                    'New comments made by our <no-localization><project>Reddit Bot</project></no-localization>',
                },
                {
                  project: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Number>
            <Number
              number={
                <AnimatedNumber
                  number={40}
                  className='text-orange-light'
                  approx
                />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2021.section.by-the-numbers.statistic.9',
                  defaultMessage: '<b>New team members</b> have joined us',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Number>
            <Number
              number={
                <AnimatedNumber number={28} className='text-orange' approx />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2021.section.by-the-numbers.statistic.10',
                  defaultMessage: '<b>New blog posts</b> from our content team',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Number>
            <Number
              number={
                <AnimatedNumber number={29} className='text-orange' approx />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2021.section.by-the-numbers.statistic.11',
                  defaultMessage:
                    '<b>Grants requested</b> of us within the first 45 days',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Number>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};
export default ByTheNumbers;
