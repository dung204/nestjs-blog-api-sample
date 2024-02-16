import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsUUID()
  userId!: string;

  @IsOptional()
  @IsUUID('all', { each: true })
  tagIds?: string[];
}
