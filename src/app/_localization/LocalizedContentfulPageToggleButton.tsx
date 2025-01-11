'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import { defaultLocale } from '../../../translation/defaultLocale';

import { useDynamicTranslationStore } from 'lib/stores/dynamicTranslationStore';
import { usePathnameLocale } from 'lib/translation/usePathnameLocale';

const LocalizedContentfulPageToggleButton = ({
  className,
}: {
  className?: string;
}) => {
  const intl = useIntl();
  const { showLocalizedContent, setShowLocalizedContent } =
    useDynamicTranslationStore();

  const currentLocale = usePathnameLocale();
  const enabled = currentLocale && currentLocale !== defaultLocale;

  const buttonLabel = showLocalizedContent
    ? intl.formatMessage({
        id: 'component.translatable-contentful-entry-field.translate-button.show-original',
        defaultMessage: 'Show content in original language',
      })
    : intl.formatMessage({
        id: 'component.translatable-contentful-entry-field.translate-button.label',
        defaultMessage: 'Show automatically translated content',
      });

  const toggleShowLocalizedContent = () =>
    setShowLocalizedContent((show) => !show);

  return (
    <div className={className}>
      <button
        className={classNames('text-lg w-fit', { invisible: !enabled })}
        disabled={!enabled}
        onClick={toggleShowLocalizedContent}
        type='button'
      >
        <span>
          <FontAwesomeIcon icon={faLanguage} fixedWidth />{' '}
          <span className='underline'>{buttonLabel}</span>
        </span>
      </button>
    </div>
  );
};

export default LocalizedContentfulPageToggleButton;
