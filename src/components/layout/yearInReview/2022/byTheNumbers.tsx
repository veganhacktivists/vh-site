import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import AnimatedNumber from '../../../decoration/animatedNumber';

import CustomImage from 'components/decoration/customImage';
import getServerIntl from 'app/intl';

import NumberImage from '~images/yearInReview/2022/numbers.png';

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
      <div className='text-white uppercase pb-20 bg-black pt-20 px-5'>
        <div className='flex justify-center pb-10'>
          <CustomImage alt='' src={NumberImage} />
        </div>
        <span className='text-6xl font-bold font-mono'>
          {intl.formatMessage({
            id: 'page.year-in-review.2022.section.by-the-numbers.heading',
            defaultMessage: 'By the numbers',
          })}
        </span>
        <div className='md:w-3/4 mx-auto text-left font-mono text-3xl pt-20 pb-10'>
          <Number
            number={<AnimatedNumber number={2636} className='text-magenta' />}
          >
            {intl.formatMessage(
              {
                id: 'page.year-in-review.2022.section.by-the-numbers.applicants',
                defaultMessage:
                  '<b>Volunteer applicants</b> for <no-localization>Vegan Hacktivists</no-localization>',
              },
              {
                b: (chunks) => <b>{chunks}</b>,
              },
            )}
          </Number>
          <div className='flex flex-col md:flex-row flex-wrap mt-5'>
            <Number
              number={<AnimatedNumber number={56623} className='text-green' />}
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2022.section.by-the-numbers.emails',
                  defaultMessage:
                    'Emails successfully sent across all <b>newsletters</b>',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Number>
            <Number
              number={<AnimatedNumber number={2077} className='text-green' />}
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2022.section.by-the-numbers.newsletter-clicks',
                  defaultMessage:
                    'Clicks from our newsletter <b>to our services</b>',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Number>
            <Number
              number={<AnimatedNumber number={147} className='text-green' />}
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2022.section.by-the-numbers.organizations-supported',
                  defaultMessage:
                    '<b>Organizations supported</b> by <no-localization>Vegan Hacktivists</no-localization>',
                },
                {
                  b: (chunks) => <b>{chunks}</b>,
                },
              )}
            </Number>
            <Number
              number={
                <AnimatedNumber number={133060} className='text-yellow' />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2022.section.by-the-numbers.watch-dominion-visitors',
                  defaultMessage:
                    'Visitors to <link><no-localization>watchdominion.org</no-localization></link>',
                },
                {
                  link: (chunks) => (
                    <Link href='https://watchdominion.org'>
                      <b>{chunks}</b>
                    </Link>
                  ),
                },
              )}
            </Number>
            <Number
              number={<AnimatedNumber number={812} className='text-yellow' />}
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2022.section.by-the-numbers.vegan-linguists.translators',
                  defaultMessage:
                    'Translators signed up on <link><no-localization>veganlinguists.org</no-localization></link>',
                },
                {
                  link: (chunks) => (
                    <Link href='https://veganlinguists.org'>
                      <b>{chunks}</b>
                    </Link>
                  ),
                },
              )}
            </Number>
            <Number
              number={
                <AnimatedNumber number={147382} className='text-yellow' />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2022.section.by-the-numbers.vegan-linguists.words-translated',
                  defaultMessage:
                    'Words translated on <link><no-localization>veganlinguists.org</no-localization></link>',
                },
                {
                  link: (chunks) => (
                    <Link href='https://veganlinguists.org'>
                      <b>{chunks}</b>
                    </Link>
                  ),
                },
              )}
            </Number>

            <Number
              number={
                <AnimatedNumber number={10823} className='text-orange-light' />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2022.section.by-the-numbers.vegan-bootcamp.courses-completed',
                  defaultMessage:
                    'Courses completed on <link><no-localization>veganbootcamp.org</no-localization></link>',
                },
                {
                  link: (chunks) => (
                    <Link href='https://veganbootcamp.org'>
                      <b>{chunks}</b>
                    </Link>
                  ),
                },
              )}
            </Number>
            <Number
              number={
                <AnimatedNumber number={18102} className='text-orange-light' />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2022.section.by-the-numbers.vegan-bootcamp.users-signed-up',
                  defaultMessage:
                    'Users signed up on <link><no-localization>veganbootcamp.org</no-localization></link>',
                },
                {
                  link: (chunks) => (
                    <Link href='https://veganbootcamp.org'>
                      <b>{chunks}</b>
                    </Link>
                  ),
                },
              )}
            </Number>
            <Number
              number={
                <AnimatedNumber number={3025} className='text-orange-light' />
              }
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2022.section.by-the-numbers.activist-hub.sign-ups',
                  defaultMessage:
                    'Activists signed up on <link><no-localization>activisthub.org</no-localization></link>',
                },
                {
                  link: (chunks) => (
                    <Link href='https://activisthub.org'>
                      <b>{chunks}</b>
                    </Link>
                  ),
                },
              )}
            </Number>

            <Number
              number={<AnimatedNumber number={754} className='text-orange' />}
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2022.section.by-the-numbers.activist-hub.events',
                  defaultMessage:
                    'Global events launched on <link><no-localization>activisthub.org</no-localization></link>',
                },
                {
                  link: (chunks) => (
                    <Link href='https://activisthub.org'>
                      <b>{chunks}</b>
                    </Link>
                  ),
                },
              )}
            </Number>
            <Number
              number={<AnimatedNumber number={15008} className='text-orange' />}
            >
              {intl.formatMessage(
                {
                  id: 'page.year-in-review.2022.section.by-the-numbers.activist-hub.actions',
                  defaultMessage:
                    'Actions performed on <link><no-localization>activisthub.org</no-localization></link>',
                },
                {
                  link: (chunks) => (
                    <Link href='https://activisthub.org'>
                      <b>{chunks}</b>
                    </Link>
                  ),
                },
              )}
            </Number>
          </div>
        </div>
      </div>
    </>
  );
};
export default ByTheNumbers;
