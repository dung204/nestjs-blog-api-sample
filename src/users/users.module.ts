import { Module } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { UsersRepository } from '@/users/users.repository';
import { UsersController } from '@/users/users.controller';
import { DatabaseModule } from '@/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
