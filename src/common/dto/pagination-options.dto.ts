import { Order } from '@/common/enums/Order';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';

export default class PaginationOptionsDto {
  @Type(() => Number)
  @IsInt()
  readonly page: number = 1;

  @Type(() => Number)
  @IsInt()
  readonly limit: number = 10;

  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(Order)
  readonly order: Order = Order.ASC;

  readonly orderBy: string = 'createdAt';
}
