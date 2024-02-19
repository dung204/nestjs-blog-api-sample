import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'Post title',
    description: 'The title of the Post',
  })
  @IsString()
  title!: string;

  @ApiProperty({
    example: 'Post content',
    description: 'The content of the Post',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    example: 'c4a4f3e7-0f3d-4d9f-9e6d-3d3f8e0b0e6b',
    description: 'The UUID of the user who created the Post',
  })
  @IsUUID()
  userId!: string;

  @ApiProperty({
    example: [
      'c4a4f3e7-0f3d-4d9f-9e6d-3d3f8e0b0e6b',
      '827a7e52-d641-52e4-9df6-b957d6568cff',
      'e334b17b-756f-5c80-a343-79731b488f02',
    ],
    description: 'An array of UUIDs of the tags associated with the Post',
    required: false,
  })
  @IsOptional()
  @IsUUID('all', { each: true })
  tagIds?: string[];
}
