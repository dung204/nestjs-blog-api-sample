import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '@/users/entities/user.entity';
import PaginationOptionsDto from '@/common/dto/pagination-options.dto';
import PaginationDto from '@/common/dto/pagination.dto';
import PaginationMetaDto from '@/common/dto/pagination-meta.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  private selectQueryBuilder = this.createQueryBuilder('user');

  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findAllPaginated(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<User>> {
    const { page, limit, order, orderBy } = paginationOptionsDto;

    const [users, totalCount] = await this.selectQueryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .orderBy(`user.${orderBy}`, order)
      .getManyAndCount();

    return new PaginationDto(
      users,
      new PaginationMetaDto({ paginationOptionsDto, totalCount }),
    );
  }

  async findOneById(id: string) {
    return this.selectQueryBuilder.where('user.id = :id', { id }).getOne();
  }

  async findOneByEmail(email: string) {
    return this.selectQueryBuilder
      .where('user.email = :email', { email })
      .getOne();
  }
}
