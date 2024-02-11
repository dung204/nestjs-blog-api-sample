import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import PaginatedResponse from '@/common/interfaces/PaginatedResponse';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(
    limit: number,
    page: number,
  ): Promise<PaginatedResponse<User[]>> {
    const [users, totalCount] = await this.userRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: users,
      meta: {
        page,
        limit,
        totalCount,
        hasNextPage: page * limit < totalCount,
      },
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with id ${id} not found!`);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException(`User with id ${id} not found!`);

    return this.userRepository.remove(user);
  }
}
