export default interface PaginatedResponse<T extends any[]> {
  data: T;
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}
