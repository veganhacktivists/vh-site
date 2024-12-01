import type { ReactElement } from 'react';
import type { PrimitiveType } from 'react-intl';

// react intl supports rendering react element values
// but the types are not including this feature.
// this should be only a temporary solution, because
// the functionality could change in a later version

declare module '@formatjs/intl' {
  export interface IntlFormatters<TBase = unknown> {
    formatMessage<T extends TBase>(
      descriptor: MessageDescriptor,
      values: Record<
        string,
        PrimitiveType | T | ((chunk: string | string[]) => ReactElement)
      >,
    ): string | T | (T | string)[];
  }
}
