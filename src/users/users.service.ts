import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import PaginationOptionsDto from '@/common/dto/pagination-options.dto';
import { UsersRepository } from '@/users/users.repository';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  constructor(
    @Inject(UsersRepository)
    private readonly userRepository: UsersRepository,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(paginationOptionsDto: PaginationOptionsDto) {
    return this.userRepository.findAllPaginated(paginationOptionsDto);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneById(id);

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
