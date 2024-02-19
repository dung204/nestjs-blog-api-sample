import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { Post } from '@/posts/entities/post.entity';
import PaginationOptionsDto from '@/common/dto/pagination-options.dto';
import PaginationDto from '@/common/dto/pagination.dto';
import PaginationMetaDto from '@/common/dto/pagination-meta.dto';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class PostsRepository extends Repository<Post> {
  private selectQueryBuilder: SelectQueryBuilder<Post> =
    this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.tags', 'tag');

  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async findAllPaginated(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<Post>> {
    const { page, limit, order, orderBy } = paginationOptionsDto;

    const [posts, totalCount] = await this.selectQueryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .orderBy(`post.${orderBy}`, order)
      .getManyAndCount();

    return new PaginationDto(
      posts,
      new PaginationMetaDto({ paginationOptionsDto, totalCount }),
    );
  }

  async findOneById(id: string) {
    return this.selectQueryBuilder.where('post.id = :id', { id }).getOne();
  }

  async findSomeByIdsList(ids: string[]) {
    return this.selectQueryBuilder
      .where('post.id IN (:...ids)', { ids })
      .getMany();
  }
}
