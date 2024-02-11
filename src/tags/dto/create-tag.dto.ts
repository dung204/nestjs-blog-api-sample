import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';
import { IsName } from '@/common/decorators/is-name.decorator';

export class CreateTagDto {
  @IsName()
  name!: string;

  @Optional()
  @IsString()
  description?: string;
}
