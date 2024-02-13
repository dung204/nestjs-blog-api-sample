import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import PaginationOptionsDto from '@/common/dto/pagination-options.dto';
import PaginationDto from '@/common/dto/pagination.dto';
import PaginationMetaDto from '@/common/dto/pagination-meta.dto';

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
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<User>> {
    const { page, limit, order, orderBy } = paginationOptionsDto;

    const [users, totalCount] = await this.userRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: {
        [orderBy]: order,
      },
    });

    return new PaginationDto(
      users,
      new PaginationMetaDto({
        paginationOptionsDto,
        totalCount,
      }),
    );
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
