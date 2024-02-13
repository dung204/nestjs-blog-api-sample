import PaginationMetaDtoParams from '@/common/interfaces/PaginationMetaDtoParams';
import { ApiProperty } from '@nestjs/swagger';

export default class PaginationMetaDto {
  @ApiProperty({
    description: 'The current page number',
    example: 1,
  })
  readonly page: number;

  @ApiProperty({
    description: 'The number of items in a page',
    example: 10,
  })
  readonly limit: number;

  @ApiProperty({
    description: 'The total number of items in the data source',
    example: 100,
  })
  readonly totalCount: number;

  @ApiProperty({
    description: 'A boolean indicating if there are more pages',
    example: false,
  })
  readonly hasPreviousPage: boolean;

  @ApiProperty({
    description: 'A boolean indicating if there are more pages',
    example: true,
  })
  readonly hasNextPage: boolean;

  constructor({ paginationOptionsDto, totalCount }: PaginationMetaDtoParams) {
    this.page = paginationOptionsDto.page;
    this.limit = paginationOptionsDto.limit;
    this.totalCount = totalCount;
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page * this.limit < totalCount;
  }
}
