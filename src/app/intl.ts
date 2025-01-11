import 'server-only';

import { createIntl, createIntlCache } from 'react-intl';

import { defaultLocale } from '../../translation/defaultLocale';

import { messages } from 'lib/translation/messages';

const cache = createIntlCache();

export default function getServerIntl(locale: string) {
  if (messages[locale]) {
    return createIntl({ locale, messages: messages[locale] }, cache);
  }

  return createIntl(
    { locale: defaultLocale, messages: messages[defaultLocale] },
    cache,
  );
}
