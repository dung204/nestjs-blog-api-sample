import PaginationMetaDtoParams from '@/common/interfaces/PaginationMetaDtoParams';

export default class PaginationMetaDto {
  readonly page: number;

  readonly limit: number;

  readonly totalCount: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;

  constructor({ paginationOptionsDto, totalCount }: PaginationMetaDtoParams) {
    this.page = paginationOptionsDto.page;
    this.limit = paginationOptionsDto.limit;
    this.totalCount = totalCount;
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page * this.limit < totalCount;
  }
}
