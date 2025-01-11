'use server';

import LocalizedContentfulEntryFieldClient from './LocalizedContentfulEntryFieldClient';
import { getTranslatedEntryField } from './getTranslatedEntry';

const LocalizedContentfulEntryField = async ({
  locale,
  ...props
}: {
  contentfulId: string;
  fieldId: string;
  contentType: string;
  locale: string;
}) => {
  const translatedEntryField = await getTranslatedEntryField(props, locale);

  return (
    <LocalizedContentfulEntryFieldClient
      translatedEntryField={translatedEntryField}
    />
  );
};

export default LocalizedContentfulEntryField;
