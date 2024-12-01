import { defaultLocale } from '../../../../translation/defaultLocale';

import type { NextApiHandler } from 'next';
import type { IDocsCategoryFields } from '../../../types/generated/contentful';

interface DocsQuery {
  category: string;
  section?: string;
  subsection?: string;
}

const handler: NextApiHandler<IDocsCategoryFields> = (req, res) => {
  const { category, section, subsection } = req.query as unknown as DocsQuery;

  res.setPreviewData({});

  let url = `/${defaultLocale}/handbook/${category}`;

  if (section) {
    url += `/${section}`;
  }

  if (subsection) {
    url += `#${subsection}`;
  }

  res.redirect(url);
  res.end();
};

export default handler;
