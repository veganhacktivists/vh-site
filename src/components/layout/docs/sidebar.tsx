'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import useDocsStore from '../../../lib/stores/docsStore';
import getThemeColor from '../../../lib/helpers/theme';
import { defaultLocale } from '../../../../translation/defaultLocale';

import SearchBar from './searchBar';

import type {
  IDocsCategoryFields,
  IDocsSectionFields,
  IDocumentationFields,
} from '../../../types/generated/contentful';

interface DocumentationProps extends IDocumentationFields {
  color: string;
  sectionSlug: IDocsSectionFields['slug'];
  categorySlug: IDocsCategoryFields['slug'];
}

const Documentation: React.FC<DocumentationProps> = ({
  title,
  slug,
  color,
  sectionSlug,
  categorySlug,
}) => {
  const { currentDocSlug, setCurrentDocSlug, setSelectedSectionSlug } =
    useDocsStore();

  const [hover, setHover] = useState(false);
  const isSelected = currentDocSlug === slug;

  return (
    <li>
      <Link
        href={`/${defaultLocale}/handbook/${categorySlug}/${sectionSlug}/#${slug}`}
      >
        <div
          onClick={() => {
            setCurrentDocSlug(slug);
            setSelectedSectionSlug(sectionSlug);
            setTimeout(() => {
              document.getElementById(slug)?.scrollIntoView();
            });
          }}
          onPointerEnter={() => {
            setHover(true);
          }}
          onPointerLeave={() => {
            setHover(false);
          }}
          className={classNames('cursor-pointer py-1', {
            'font-bold': isSelected,
          })}
          style={{
            color: isSelected || hover ? color : 'inherit',
          }}
        >
          {title}
        </div>
      </Link>
    </li>
  );
};
interface SectionProps extends IDocsSectionFields {
  color: IDocsCategoryFields['color'];
  categorySlug: IDocsCategoryFields['slug'];
}

const Section: React.FC<SectionProps> = ({
  slug,
  categorySlug,
  title,
  color,
  subsections,
}) => {
  const lightGrey = getThemeColor('grey-light');
  const sectionRef = useRef<HTMLDivElement>(null);

  const selectedSectionSlug = useDocsStore(
    (state) => state.selectedSectionSlug,
  );

  const isSelected = selectedSectionSlug === slug;

  return (
    <div
      className='pl-5 my-2 border-l-4'
      style={{ borderColor: isSelected ? color : lightGrey }}
      ref={sectionRef}
    >
      <Link href={`/${defaultLocale}/handbook/${categorySlug}/${slug}`}>
        <div className='py-1 text-xl font-bold cursor-pointer'>{title}</div>
      </Link>

      {subsections && (
        <ul className='px-1 mx-4 list-outside'>
          {subsections.map((doc) => (
            <Documentation
              key={doc.fields.slug}
              {...doc.fields}
              categorySlug={categorySlug}
              sectionSlug={slug}
              color={color}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

type CategoryProps = IDocsCategoryFields;

const Category: React.FC<CategoryProps> = ({ name, slug, color, sections }) => {
  const lightGrey = getThemeColor('grey-light');
  const selectedCategory = useDocsStore((state) => state.selectedCategory);

  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const isActive = slug === selectedCategory;
    if (!isActive || !detailsRef.current) return;

    const details = detailsRef.current;
    details.open = true;
  }, [selectedCategory, slug]);

  return (
    <details className='pl-5' ref={detailsRef}>
      <summary
        className='box-border px-2 py-1 font-mono text-2xl font-bold text-white cursor-pointer'
        style={{
          backgroundColor: color || lightGrey,
        }}
      >
        {name}
      </summary>
      <div>
        {sections?.map((section) => (
          <Section
            key={section.fields.slug}
            {...section.fields}
            categorySlug={slug}
            color={color}
          />
        ))}
      </div>
    </details>
  );
};

interface SidebarProps {
  categories: IDocsCategoryFields[];
}

const Sidebar: React.FC<SidebarProps> = ({ categories }) => {
  return (
    <div className='md:sticky md:left-0 md:top-0 md:w-1/4 overflow-auto text-left p-10 md:h-[calc(100vh-40px)] space-y-4 py-12'>
      <SearchBar categories={categories} />
      {categories.map((cat) => (
        <Category key={cat.slug} {...cat} />
      ))}
    </div>
  );
};

export default Sidebar;
