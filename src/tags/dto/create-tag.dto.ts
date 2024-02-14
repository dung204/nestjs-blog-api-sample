import { IsOptional, IsString } from 'class-validator';
import { IsName } from '@/common/decorators/is-name.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    example: 'JavaScript',
    description: 'The name of the tag (Unicode letters only)',
  })
  @IsName()
  name!: string;

  @ApiPropertyOptional({
    example: "The world's most misunderstood programming language",
    description: 'The description of the tag (optional)',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
