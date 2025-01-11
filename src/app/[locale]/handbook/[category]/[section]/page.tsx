'use server';

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { notFound } from 'next/navigation';

import { getContents } from '../../../../../lib/cms';
import { DarkButton } from '../../../../../components/decoration/buttons';
import RichText from '../../../../../components/decoration/richText';
import { getDocCategoryPreviewBySlug } from '../../../../../lib/cms/helpers';
import { defaultLocale } from '../../../../../../translation/defaultLocale';

import { DocsClient } from './components/clientComponent';
import { SubSectionWaypoint } from './components/subSection';

import type {
  IDocsCategory,
  IDocsCategoryFields,
  IDocsSection,
  IDocumentation,
  IDocumentationFields,
} from '../../../../../types/generated/contentful';

interface DocsProps {
  params: { category: string; section: string };
}

const getCategoryOrPreview: (
  slug: IDocsCategoryFields['slug'] | undefined,
  preview: boolean,
) => Promise<IDocsCategory> = async (slug, preview) => {
  if (preview) {
    if (!slug) {
      throw 'Slug is not defined';
    }
    return await getDocCategoryPreviewBySlug(slug);
  }

  const docs = await (slug
    ? getContents<IDocsCategoryFields>({
        contentType: 'docsCategory',
        query: {
          slug,
        },
        other: {
          limit: 1,
          include: 4,
        },
      })
    : getContents<IDocsCategoryFields>({
        contentType: 'docsCategory',
        other: {
          order: 'fields.order',
          include: 3,
          limit: 1,
        },
      }));

  return docs[0] as IDocsCategory;
};

function calculateUpdatedAt(
  category: IDocsCategory,
  section: IDocsSection,
  subsections: IDocumentation[] | undefined,
) {
  const categoryDate = new Date(category.sys.updatedAt);
  const sectionDate = new Date(section.sys.updatedAt);
  const docDates = subsections?.map((doc) => new Date(doc.sys.updatedAt)) || [];

  const mostRecentDate = [categoryDate, sectionDate, ...docDates].reduce(
    (date, mostRecent) => (date > mostRecent ? date : mostRecent),
    categoryDate,
  );

  return mostRecentDate;
}

const Content: React.FC<{
  category: IDocsCategory;
  section: IDocsSection;
}> = ({ category, section }) => {
  const { subsections, content, slug } = section?.fields || {};

  const updatedAt = calculateUpdatedAt(category, section, subsections);

  const sectionIndex = category.fields.sections.findIndex(
    (section) => section.fields.slug === slug,
  );

  const prev =
    sectionIndex > 0 ? category.fields.sections[sectionIndex - 1] : undefined;
  const next =
    sectionIndex < category.fields.sections.length - 1
      ? category.fields.sections[sectionIndex + 1]
      : undefined;

  return (
    <div className='w-full md:flex-[3] py-10 text-left px-10 md:pr-48 bg-white'>
      <div className='flex flex-row justify-between mb-5'>
        <div id={slug}>
          <h2
            className='font-mono text-xl font-bold'
            style={{ color: category.fields.color }}
          >
            {category.fields.name}
          </h2>
          <h3 className='text-3xl font-bold'>{section.fields.title}</h3>
        </div>
        <div className='text-right text-normal md:text-left'>
          <span className='font-bold'>Last updated:</span>{' '}
          <span className='block md:inline'>
            {new Intl.DateTimeFormat(defaultLocale, {
              month: 'long',
              year: 'numeric',
              day: 'numeric',
            }).format(updatedAt)}
          </span>
          <span className='hidden md:inline'> | </span>
          <Link
            href={`/${defaultLocale}/contact`}
            className='underline opacity-100 text-green hover:opacity-70'
          >
            Suggest Updates
          </Link>
        </div>
      </div>
      {content && (
        <div>
          <RichText document={content} />
        </div>
      )}
      {subsections?.map((doc) => (
        <Fragment key={doc.fields.slug}>
          <hr className='mt-10 text-grey-light first-of-type:hidden' />
          <SubSection key={doc.fields.slug} {...doc.fields} />
        </Fragment>
      ))}
      <div className='flex items-center justify-center mt-10 space-x-4'>
        <p className='hidden lg:block'>{prev && prev.fields.title}</p>
        <DarkButton
          disabled={prev === undefined}
          href={
            prev
              ? `/${defaultLocale}/handbook/${category.fields.slug}/${prev.fields.slug}`
              : undefined
          }
        >
          <FontAwesomeIcon size='sm' icon={faArrowLeft} />
          &nbsp; Previous
        </DarkButton>
        &nbsp; &nbsp;
        <DarkButton
          disabled={next === undefined}
          href={
            next
              ? `/${defaultLocale}/handbook/${category.fields.slug}/${next.fields.slug}`
              : undefined
          }
        >
          Next &nbsp;
          <FontAwesomeIcon size='sm' icon={faArrowRight} />
        </DarkButton>
        <p className='hidden lg:block'>{next && next.fields.title}</p>
      </div>
    </div>
  );
};

const SubSection: React.FC<IDocumentationFields> = ({
  slug,
  title,
  content,
}) => {
  return (
    <>
      <SubSectionWaypoint slug={slug} />
      <div key={slug} id={slug}>
        <h2 className='pt-10 text-2xl font-bold'>{title}</h2>
        <RichText document={content} />
      </div>
    </>
  );
};

const Docs: React.FC<DocsProps> = async ({
  params: { category: categoryParam, section: sectionParam },
}) => {
  const category = await getCategoryOrPreview(categoryParam, false);

  const section = sectionParam
    ? category.fields.sections.find(
        (section) => section.fields.slug === sectionParam,
      )
    : category.fields.sections[0];

  const categories = await getContents<IDocsCategoryFields>({
    contentType: 'docsCategory',
    other: {
      order: 'fields.order',
      include: 4,
    },
  });

  if (!categories || !category || !section) {
    return notFound();
  }

  return (
    <>
      <DocsClient
        categories={categories as IDocsCategory[]}
        category={category}
        section={section}
      >
        {section && category && (
          <Content section={section} category={category} />
        )}
      </DocsClient>
    </>
  );
};

export default Docs;
