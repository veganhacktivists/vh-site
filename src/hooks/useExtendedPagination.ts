import { usePagination } from 'react-use-pagination';
import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

import useOnce from './useOnce';

interface ExtendedPaginationProps {
  totalItems?: number;
  initialPageSize?: number;
  initialPage?: number;
}

export const useExtendedPagination = (props: ExtendedPaginationProps) => {
  const searchParams = useSearchParams();
  const pagination = usePagination({
    totalItems: props.totalItems,
    initialPageSize: props.initialPageSize,
    initialPage: props.initialPage,
  });
  useOnce(() => {
    const page = searchParams?.get('page');
    if (page !== undefined) {
      let newPage = Number(page);
      newPage -= 1;
      newPage = newPage >= 0 ? newPage : 0;
      if (newPage !== pagination.currentPage) {
        pagination.setPage(newPage);
      }
    }
  });
  /*
   * Is needed in order to not rerender on param change
   */
  const changeHistoryParam = useCallback((key: string, value: string) => {
    const url = new URL(window.location.toString());

    url.searchParams.set(key, value);

    const newUrl = url.toString();

    window.history.pushState({ path: newUrl }, '', newUrl);
  }, []);

  const increasePageNumber = useCallback(() => {
    if (pagination.currentPage + 1 === pagination.totalPages) {
      return;
    }
    const newPageQuery: number = pagination.currentPage + 2;
    changeHistoryParam('page', newPageQuery.toString());
  }, [changeHistoryParam, pagination.currentPage, pagination.totalPages]);

  const decreasePageNumber = useCallback(() => {
    if (pagination.currentPage === 0) {
      return;
    }
    changeHistoryParam('page', pagination.currentPage.toString());
  }, [changeHistoryParam, pagination.currentPage]);

  return {
    increasePageParam: increasePageNumber,
    decreasePageParam: decreasePageNumber,
    ...pagination,
  };
};
