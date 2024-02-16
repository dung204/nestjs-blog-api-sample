import { DataSource, Repository } from 'typeorm';
import { Tag } from '@/tags/entities/tag.entity';
import { Injectable } from '@nestjs/common';
import PaginationOptionsDto from '@/common/dto/pagination-options.dto';
import PaginationDto from '@/common/dto/pagination.dto';
import PaginationMetaDto from '@/common/dto/pagination-meta.dto';

@Injectable()
export class TagsRepository extends Repository<Tag> {
  private selectQueryBuilder = this.createQueryBuilder('tag');

  constructor(private readonly dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }

  async findAllPaginated(paginationOptionsDto: PaginationOptionsDto) {
    const { page, limit, order, orderBy } = paginationOptionsDto;

    const [tags, totalCount] = await this.selectQueryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .orderBy(`tag.${orderBy}`, order)
      .getManyAndCount();

    return new PaginationDto(
      tags,
      new PaginationMetaDto({ paginationOptionsDto, totalCount }),
    );
  }

  async findOneById(id: string) {
    return this.selectQueryBuilder.where('tag.id = :id', { id }).getOne();
  }
}
