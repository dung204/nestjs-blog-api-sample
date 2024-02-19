import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@/database/database.module';
import { Tag } from '@/tags/entities/tag.entity';
import { TagsService } from '@/tags/tags.service';
import { TagsController } from '@/tags/tags.controller';
import { TagsRepository } from '@/tags/tags.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), DatabaseModule],
  controllers: [TagsController],
  providers: [TagsService, TagsRepository],
  exports: [TagsService],
})
export class TagsModule {}
