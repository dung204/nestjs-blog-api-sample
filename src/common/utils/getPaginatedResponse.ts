import PaginatedResponse from '@/common/interfaces/PaginatedResponse';

export default function getPaginatedResponse<T extends any[]>(
  data: T,
  totalCount: number,
  limit: number,
  page: number,
): PaginatedResponse<T> {
  return {
    data,
    meta: {
      page,
      limit,
      totalCount,
      hasNextPage: page * limit < totalCount,
    },
  };
}
