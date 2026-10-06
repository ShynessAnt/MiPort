export interface PaginationResult<T> {
  pageItems: T[];
  totalPages: number;
  currentPage: number;
}

export function usePagination<T>(
  items: T[],
  pageSize: number,
  page: number,
): PaginationResult<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    pageItems: items.slice(start, start + pageSize),
    totalPages: items.length === 0 ? 0 : totalPages,
    currentPage: items.length === 0 ? 1 : currentPage,
  };
}
