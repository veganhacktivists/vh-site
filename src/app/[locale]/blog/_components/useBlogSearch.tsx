import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useExtendedPagination } from 'hooks/useExtendedPagination';
import useFuse from 'hooks/useFuse';
import { useHash } from 'hooks/useHash';
import useOnce from 'hooks/useOnce';

import type { TanslatedBlogEntry } from '../page';
import type { IBlogEntry } from 'types/generated/contentful';

const filterByTag: (entry: IBlogEntry, tagQuery?: string | null) => boolean = (
  entry,
  tagQuery,
) => {
  if (tagQuery === undefined) return true;

  if (tagQuery !== null && tagQuery !== 'other') {
    return !!entry.fields.tags?.find((tag) => tag.fields.slug === tagQuery);
  }

  return !entry.fields.tags;
};

const BLOG_FILTER_OPTIONS = { keys: ['fields.title'] };

export function useBlogSearch(blogs: TanslatedBlogEntry[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams?.entries() ?? []);

  const [firstBlog, ...otherBlogs] = blogs;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hash, setHash] = useHash();
  const { page, search } = searchParamsObject;

  const handleTagQuery = (tag?: string | null) => {
    setTagQuery(tag);
    setHash(tag);
  };
  useEffect(() => {
    setTagQuery(hash || undefined);
  }, [hash]);

  const [tagQuery, setTagQuery] = useState<string | null | undefined>(
    hash || undefined,
  );

  const updateSearchParam = useCallback(() => {
    const search = new URLSearchParams({
      ...searchParamsObject,
      search: searchQuery,
    }).toString();

    void router.replace(pathname + (search ? '?' + search : ''));
  }, [pathname, router, searchParamsObject, searchQuery]);

  const filteredFirstBlog = useFuse({
    data: [firstBlog],
    options: BLOG_FILTER_OPTIONS,
    term: searchQuery,
  }).filter((entry) => filterByTag(entry, tagQuery));

  const filteredEntries = useFuse({
    data: otherBlogs,
    options: BLOG_FILTER_OPTIONS,
    term: searchQuery,
    sort: true,
  }).filter((entry) => filterByTag(entry, tagQuery));

  const {
    startIndex,
    endIndex,
    setPreviousPage,
    setNextPage,
    setPage,
    currentPage,
    previousEnabled,
    nextEnabled,
    increasePageParam,
    decreasePageParam,
  } = useExtendedPagination({
    totalItems: filteredEntries.length,
    initialPageSize: 9,
  });

  useOnce(() => {
    if (page !== undefined) {
      let newPage = Number(page);
      newPage -= 1;
      newPage = newPage >= 0 ? newPage : 0;
      if (newPage !== currentPage) {
        setPage(newPage);
      }
    }
    if (search !== undefined && typeof search === 'string') {
      if (search !== searchQuery) {
        setSearchQuery(search);
      }
    }
  });

  return {
    tagQuery,
    updateSearchParam,
    setSearchQuery,
    handleTagQuery,
    searchQuery,
    filteredFirstBlog,
    filteredEntries,
    currentPage,
    startIndex,
    endIndex,
    decreasePageParam,
    setPreviousPage,
    previousEnabled,
    increasePageParam,
    setNextPage,
    nextEnabled,
  };
}
