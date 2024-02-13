import { Order } from '@/common/enums/Order';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';

export default class PaginationOptionsDto {
  @ApiProperty({
    description: 'The current page number',
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  readonly page: number = 1;

  @ApiProperty({
    description: 'The number of items in a page',
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  readonly limit: number = 10;

  @ApiProperty({
    description: 'The order of the items',
    enum: Order,
    default: Order.ASC,
  })
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(Order)
  readonly order: Order = Order.ASC;

  readonly orderBy: string = 'createdAt';
}
