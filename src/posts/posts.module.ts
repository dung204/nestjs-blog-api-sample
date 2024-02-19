import { Module } from '@nestjs/common';
import { PostsService } from '@/posts/posts.service';
import { PostsController } from '@/posts/posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@/database/database.module';
import { Post } from '@/posts/entities/post.entity';
import { UsersModule } from '@/users/users.module';
import { TagsModule } from '@/tags/tags.module';
import { PostsRepository } from '@/posts/posts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    DatabaseModule,
    UsersModule,
    TagsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [PostsService],
})
export class PostsModule {}
