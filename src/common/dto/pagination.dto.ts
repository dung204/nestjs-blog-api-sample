import PaginationMetaDto from '@/common/dto/pagination-meta.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export default class PaginationDto<T> {
  @ApiProperty({
    isArray: true,
    description: 'An array of `T` data',
  })
  @IsArray()
  readonly data: T[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  readonly meta: PaginationMetaDto;

  constructor(data: T[], meta: PaginationMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
