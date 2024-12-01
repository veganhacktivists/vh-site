import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import YoutubeVideo from './youtubeVideo';

import ContentfulImage from 'components/layout/contentfulImage';

import type {
  CONTENT_TYPE,
  ICodeBlock,
  IYoutubeVideo,
} from 'types/generated/contentful';
import type { Document, Hyperlink } from '@contentful/rich-text-types';
import type {
  NodeRenderer,
  Options,
} from '@contentful/rich-text-react-renderer';
import type { Asset, Entry } from 'contentful';

interface RichTextProps {
  document: Document;
  overrides?: Partial<Options>;
}

const embeddedAssetRenderer: Partial<Record<CONTENT_TYPE, NodeRenderer>> = {
  codeBlock: (node) => {
    const { language, content } = (node.data.target as ICodeBlock).fields;

    return (
      <div className='border-2 w-min border-grey-lighter'>
        <SyntaxHighlighter showLineNumbers language={language}>
          {documentToPlainTextString(content, '\n')}
        </SyntaxHighlighter>
      </div>
    );
  },
  youtubeVideo: (node) => {
    const { id } = (node.data.target as IYoutubeVideo).fields;

    return (
      <div className='w-full mx-auto my-10 md:w-4/5'>
        <YoutubeVideo id={id} />
      </div>
    );
  },
};

const defaultRichTextOptions: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      const contentType = (node.data.target as Entry<unknown>).sys.contentType
        .sys.id as CONTENT_TYPE;
      return <>{embeddedAssetRenderer?.[contentType]?.(node, children)}</>;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const imageData = node.data.target as Asset;
      const { title, description } = imageData?.fields;
      return (
        <figure>
          <ContentfulImage image={imageData} alt={title} useNextImage={false} />
          {description && (
            <figcaption className='text-base italic text-gray-dark'>
              {description}
            </figcaption>
          )}
        </figure>
      );
    },
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className='pt-10 text-3xl font-bold'>{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className='text-2xl font-bold pt-7'>{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className='pt-5 text-xl font-bold'>{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className='mt-5 ml-5 list-disc'>{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ul className='mt-5 ml-5 list-disc'>{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className='mt-2'>{children}</li>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <div className='px-3 mt-5 border-l-4 border-l-grey-light max-w-fit'>
        {children}
      </div>
    ),
    [BLOCKS.HR]: () => <hr className='mt-5' />,
    [INLINES.HYPERLINK]: (node, children) => {
      // The Link component can't be used to render rich text to a string.
      return (
        <a
          href={(node as Hyperlink).data.uri}
          className='font-semibold underline hover:text-grey visited:text-grey'
        >
          {children}
        </a>
      );
    },
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className='mt-5 first:mt-0'>{children}</p>
    ),
  },
  renderMark: {},
};

const RichText: React.FC<RichTextProps> = ({ document, overrides }) => {
  const options = {
    renderNode: {
      ...defaultRichTextOptions.renderNode,
      ...overrides?.renderNode,
    },
    renderMark: {
      ...defaultRichTextOptions.renderMark,
      ...overrides?.renderMark,
    },
  };

  return <>{documentToReactComponents(document, options)}</>;
};

export default RichText;
