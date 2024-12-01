import { createHash } from 'crypto';

import { BLOCKS, type Document } from '@contentful/rich-text-types';
import React from 'react';

import { renderToStaticMarkup } from 'wrap-react-dom-server';
import RichText from 'components/decoration/richText';

export function getLocalizedHTMLHash(html: string): string {
  return createHash('sha256').update(html).digest('hex');
}

export function getHTMLStringFromFieldValue(
  value: unknown,
): string | undefined {
  if (isContentfulRichTextDocument(value)) {
    return renderToStaticMarkup(
      React.createElement(RichText, { document: value }),
    );
  }

  if (typeof value === 'string') {
    return value;
  }
}

function isContentfulRichTextDocument(value: unknown): value is Document {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'nodeType' in value &&
      value.nodeType === BLOCKS.DOCUMENT,
  );
}
