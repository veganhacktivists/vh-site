'use client';

import LocalizedContentfulEntryFieldClient, {
  useLocalizedContentfulEntryFieldClient,
} from 'app/_localization/LocalizedContentfulEntryFieldClient';

interface Props {
  title: Record<string, string>;
}

const BlogEntrySummaryTitle = ({ title }: Props) => {
  return (
    <b
      className='font-mono text-2xl font-semibold md:line-clamp-2 break-words'
      title={useLocalizedContentfulEntryFieldClient(title)}
    >
      <LocalizedContentfulEntryFieldClient translatedEntryField={title} />
    </b>
  );
};

export default BlogEntrySummaryTitle;
