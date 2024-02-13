import PaginationMetaDto from '@/common/dto/pagination-meta.dto';
import { IsArray } from 'class-validator';

export default class PaginationDto<T> {
  @IsArray()
  readonly data: T[];

  readonly meta: PaginationMetaDto;

  constructor(data: T[], meta: PaginationMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
