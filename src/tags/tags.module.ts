import { Module } from '@nestjs/common';
import { TagsService } from '@/tags/tags.service';
import { TagsController } from '@/tags/tags.controller';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
