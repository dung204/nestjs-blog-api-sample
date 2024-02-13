import PaginationOptionsDto from '@/common/dto/pagination-options.dto';

export default interface PaginationMetaDtoParams {
  paginationOptionsDto: PaginationOptionsDto;
  totalCount: number;
}
