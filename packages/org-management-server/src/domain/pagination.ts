import { PageQuery, PageResponse } from './types';

const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

export const normalizePageNumber = (pageNumber: PageQuery['pageNumber']) =>
  typeof pageNumber === 'number' && pageNumber > 0 ? Math.floor(pageNumber) : DEFAULT_PAGE_NUMBER;

export const normalizePageSize = (pageSize: PageQuery['pageSize']) => {
  if (typeof pageSize !== 'number' || pageSize <= 0) {
    return DEFAULT_PAGE_SIZE;
  }

  return Math.min(Math.floor(pageSize), MAX_PAGE_SIZE);
};

export const paginate = <T>(items: T[], query: PageQuery = {}): PageResponse<T> => {
  const pageSize = normalizePageSize(query.pageSize);
  const totalElements = items.length;
  const totalPages = Math.max(Math.ceil(totalElements / pageSize), 1);
  const currentPage = Math.min(normalizePageNumber(query.pageNumber), totalPages - 1);
  const start = currentPage * pageSize;
  const pagedItems = items.slice(start, start + pageSize);

  return {
    items: pagedItems,
    totalPages,
    totalElements,
    isLastPage: currentPage >= totalPages - 1,
    isFirstPage: currentPage === 0,
    currentPage,
    pageSize,
  };
};
