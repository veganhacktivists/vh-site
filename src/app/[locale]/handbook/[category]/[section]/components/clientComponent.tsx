'use client';

import { useEffect } from 'react';

import { useHash } from 'hooks/useHash';
import useDocsStore from 'lib/stores/docsStore';
import Sidebar from 'components/layout/docs/sidebar';

import type { IDocsCategory, IDocsSection } from 'types/generated/contentful';
import type { PropsWithChildren } from 'react';

interface DocsProps {
  category: IDocsCategory;
  section: IDocsSection;
  categories: IDocsCategory[];
}

export const DocsClient: React.FC<PropsWithChildren<DocsProps>> = ({
  categories,
  category,
  section,
  children,
}) => {
  const { setCurrentDocSlug, setSelectedSectionSlug, setSelectedCategorySlug } =
    useDocsStore();
  const [currentDocSlug] = useHash();

  useEffect(() => {
    currentDocSlug && setCurrentDocSlug(currentDocSlug);
    category?.fields.slug && setSelectedCategorySlug(category.fields.slug);
    section?.fields.slug && setSelectedSectionSlug(section.fields.slug);
  }, [
    currentDocSlug,
    category?.fields?.slug,
    section?.fields?.slug,
    setCurrentDocSlug,
    setSelectedCategorySlug,
    setSelectedSectionSlug,
  ]);

  return (
    <>
      <div className='flex flex-col md:flex-row bg-grey-over-background'>
        <Sidebar categories={categories.map((cat) => cat.fields)} />
        {children}
      </div>
    </>
  );
};
