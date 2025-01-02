import React from 'react';
import classNames from 'classnames';

import { NavButton } from '../../decoration/buttons';
import SquareField from '../../decoration/squares';
import { FirstSubSection } from '../../decoration/textBlocks';

import getServerIntl from 'app/intl';

interface YearButtonProps {
  year: number;
  locale: string;
}

const YearButton: React.FC<YearButtonProps> = ({ year, locale }) => {
  return (
    <NavButton
      className='w-48 font-bold'
      href={`/${locale}/year-in-review/${year}`}
    >
      {year}
    </NavButton>
  );
};

interface YearInReviewButtonProps {
  currentYear: number;
  locale: string;
}

const YearInReviewButtons: React.FC<YearInReviewButtonProps> = ({
  currentYear,
  locale,
}) => {
  return (
    <div>
      <div
        className={classNames('pb-10 flex justify-center flex-wrap', {
          'mb-10': currentYear === 2020 || currentYear === 2021,
        })}
      >
        {[2020, 2021, 2022, 2023].map((year) => (
          <YearButton key={year} locale={locale} year={year} />
        ))}
      </div>
    </div>
  );
};

interface YearInReviewHeaderProps {
  year: number;
  hero: React.ReactNode;
  customMainSection?: React.ReactNode;
  locale: string;
}

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'green', size: 32, left: 16, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },

  { color: 'red', size: 32, right: 0, top: -16 },
  { color: 'orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

export const YearInReviewHeader: React.FC<YearInReviewHeaderProps> = ({
  year,
  hero,
  customMainSection,
  locale,
}) => {
  const intl = getServerIntl(locale);

  return (
    <div className='bg-grey-background'>
      {hero}
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className='hidden md:block'
      />
      {customMainSection ?? (
        <FirstSubSection
          header={intl
            .formatMessage({
              id: 'page.year-in-review.section.header.title',
              defaultMessage:
                'Our <no-localization>{year}</no-localization> <b>year in review</b>',
            })
            .replace('{year}', String(year))}
          className='pt-5'
        >
          {intl.formatMessage(
            {
              id: 'page.year-in-review.section.header.content',
              defaultMessage:
                "We're so happy to release our <no-localization>{year}</no-localization> Year in Review! Scroll down to read all of our accomplishments thanks to your generous support, our partners, and most of all our amazing volunteers.",
            },
            { year },
          )}
        </FirstSubSection>
      )}
      <YearInReviewButtons locale={locale} currentYear={year} />
    </div>
  );
};

export default YearInReviewHeader;
