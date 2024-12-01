'use client';

import React, { useCallback, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLongArrowAltLeft as leftArrow,
  faLongArrowAltRight as rightArrow,
} from '@fortawesome/free-solid-svg-icons';

import { useBlogSearch } from './useBlogSearch';

import SubtleBorder from 'components/decoration/subtleBorder';
import { DarkButton } from 'components/decoration/buttons';
import BlogsHeader from 'components/layout/blog/blogsHeader';
import SquareField from 'components/decoration/squares';
import BlogEntrySummaryClient from 'components/layout/blog/blogEntrySummaryClient';
import LocalizedContentfulPageToggleButton from 'app/_localization/LocalizedContentfulPageToggleButton';

import type { TanslatedBlogEntry } from '../page';
import type { ITag } from 'types/generated/contentful';

interface Props {
  locale: string;
  blogs: TanslatedBlogEntry[];
  tags: ITag[];
}

export const BlogOverviewContainer: React.FC<Props> = ({
  locale,
  blogs,
  tags,
}) => {
  const blogContainer = useRef<HTMLDivElement>(null);
  const scrollUp = useCallback(() => {
    if (!blogContainer.current) return;
    blogContainer.current.scrollIntoView({ behavior: 'auto' });
  }, []);
  const [animatedRef] = useAutoAnimate<HTMLDivElement>();
  const {
    filteredFirstBlog,
    filteredEntries,
    currentPage,
    startIndex,
    endIndex,
    decreasePageParam,
    setPreviousPage,
    previousEnabled,
    increasePageParam,
    setSearchQuery,
    setNextPage,
    searchQuery,
    tagQuery,
    nextEnabled,
    handleTagQuery,
    updateSearchParam,
  } = useBlogSearch(blogs);
  const intl = useIntl();

  return (
    <>
      <BlogsHeader
        tags={tags}
        currentTag={tagQuery}
        onLeaveInput={updateSearchParam}
        onSearchChange={setSearchQuery}
        onTagChange={handleTagQuery}
        query={searchQuery}
      />
      <SquareField
        squares={[
          { color: 'green-light', size: 32, top: -16, left: 0 },
          { color: 'yellow', size: 16, bottom: 16, left: 32 },
          { color: 'white', size: 16, bottom: 0, left: 32 },
          { color: 'pink', size: 32, bottom: 0, right: 16 },
          { color: 'orange', size: 16, top: 0, right: 0 },
          { color: 'white', size: 16, bottom: 0, right: 0 },
        ]}
        className='hidden lg:block'
      />
      <div className='pt-20 pb-20' ref={blogContainer}>
        {!filteredFirstBlog.length && !filteredEntries.length ? (
          <div className='mx-auto text-xl'>
            {intl.formatMessage({
              id: 'page.blog.section.container.no-match',
              defaultMessage: 'No entries match your query',
            })}
          </div>
        ) : (
          <>
            <div className='px-10 xl:px-48'>
              <LocalizedContentfulPageToggleButton className='w-fit mb-6' />
              <div
                ref={animatedRef}
                className='grid md:grid-cols-3 md:gap-x-12 gap-y-10  auto-rows-min'
              >
                {filteredFirstBlog.length !== 0 && currentPage <= 0 && (
                  <SubtleBorder
                    key={filteredFirstBlog[0].fields.slug}
                    className='col-span-full'
                  >
                    <BlogEntrySummaryClient
                      blog={filteredFirstBlog[0]}
                      heading
                      locale={locale}
                      titleTranslation={filteredFirstBlog[0].titleTranslation}
                      excerptTranslation={
                        filteredFirstBlog[0].excerptTranslation
                      }
                    />
                  </SubtleBorder>
                )}
                {filteredEntries.slice(startIndex, endIndex + 1).map((blog) => (
                  <SubtleBorder
                    key={blog.fields.slug}
                    className='col-span-full md:col-span-1'
                  >
                    <BlogEntrySummaryClient
                      blog={blog}
                      locale={locale}
                      excerptTranslation={blog.excerptTranslation}
                      titleTranslation={blog.titleTranslation}
                    />
                  </SubtleBorder>
                ))}
              </div>
            </div>
          </>
        )}
        <div className='flex flex-row justify-center gap-10 p-16 mx-auto'>
          <DarkButton
            onClick={useCallback(() => {
              decreasePageParam();
              setPreviousPage();
              scrollUp();
            }, [decreasePageParam, scrollUp, setPreviousPage])}
            className='flex font-mono font-bold uppercase'
            disabled={!previousEnabled}
          >
            <div>
              <FontAwesomeIcon icon={leftArrow} size='xs' />
            </div>
            <span className='hidden pl-3 md:block'>
              {intl.formatMessage({
                id: 'page.blog.section.navigation.btn.previous',
                defaultMessage: 'Previous',
              })}
            </span>
          </DarkButton>
          <DarkButton
            onClick={useCallback(() => {
              increasePageParam();
              setNextPage();
              scrollUp();
            }, [increasePageParam, scrollUp, setNextPage])}
            className='font-mono font-bold uppercase'
            disabled={!nextEnabled}
          >
            <div className='flex'>
              <span className='hidden pr-3 md:block'>
                {intl.formatMessage({
                  id: 'page.blog.section.navigation.btn.next',
                  defaultMessage: 'Next',
                })}
              </span>
              <div>
                <FontAwesomeIcon icon={rightArrow} size='xs' />
              </div>
            </div>
          </DarkButton>
        </div>
      </div>
    </>
  );
};
