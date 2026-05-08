export type SortDirection = 'asc' | 'desc';

export type PageQuery = {
  pageNumber?: number | null;
  pageSize?: number | null;
  sortField?: string | null;
  sortDirection?: SortDirection | null;
};

export type PageResponse<T> = {
  items: T[];
  totalPages: number;
  totalElements: number;
  isLastPage: boolean;
  isFirstPage: boolean;
  currentPage: number;
  pageSize: number;
};

export type MutationResult = {
  success: boolean;
  code: string;
  message: string;
};

export const mutationSuccess = (message: string): MutationResult => ({
  success: true,
  code: 'OK',
  message,
});
