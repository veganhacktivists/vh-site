import type de from '../../localisation/de.json';
import type en from '../../localisation/en.json';

export type Localisations = 'en' | 'de';
export type TranslationKeys = string & keyof typeof de & keyof typeof en;

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: TranslationKeys;
    }
    interface IntlConfig {
      locale: Localisations;
    }
  }
}
