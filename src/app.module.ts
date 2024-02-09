import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@/database/database.module';
import { UsersModule } from '@/users/users.module';
import { PostsModule } from '@/posts/posts.module';
import { TagsModule } from '@/tags/tags.module';
import databaseConfig from '@/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DatabaseModule,
    UsersModule,
    PostsModule,
    TagsModule,
  ],
})
export class AppModule {}
