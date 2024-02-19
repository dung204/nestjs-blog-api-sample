import { OmitType, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from '@/posts/dto/create-post.dto';

export class UpdatePostDto extends PartialType(
  OmitType(CreatePostDto, ['userId']),
) {}
