import { Order } from '@/common/enums/Order';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsString } from 'class-validator';

export default class PaginationOptionsDto {
  @ApiPropertyOptional({
    description: 'The current page number',
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  readonly page: number = 1;

  @ApiPropertyOptional({
    description: 'The number of items in a page',
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  readonly limit: number = 10;

  @ApiPropertyOptional({
    description: 'The order of the items',
    enum: Order,
    default: Order.ASC,
  })
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(Order)
  readonly order: Order = Order.ASC;

  @ApiPropertyOptional({
    description: 'The field to order the items by',
    default: 'createdAt',
  })
  @IsString()
  readonly orderBy: string = 'createdAt';
}
