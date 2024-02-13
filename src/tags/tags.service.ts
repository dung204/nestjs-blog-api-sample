import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTagDto } from '@/tags/dto/create-tag.dto';
import { UpdateTagDto } from '@/tags/dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '@/tags/entities/tag.entity';
import PaginationOptionsDto from '@/common/dto/pagination-options.dto';
import PaginationDto from '@/common/dto/pagination.dto';
import PaginationMetaDto from '@/common/dto/pagination-meta.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  create(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto);
    return this.tagsRepository.save(tag);
  }

  async findAll(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<Tag>> {
    const { page, limit, order, orderBy } = paginationOptionsDto;

    const [tags, totalCount] = await this.tagsRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: {
        [orderBy]: order,
      },
    });

    return new PaginationDto(
      tags,
      new PaginationMetaDto({
        paginationOptionsDto,
        totalCount,
      }),
    );
  }

  async findOne(id: string) {
    const tag = await this.tagsRepository.findOneBy({ id });

    if (!tag) throw new NotFoundException('Tag not found');

    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const tag = await this.findOne(id);

    return this.tagsRepository.save({ ...tag, ...updateTagDto });
  }

  async remove(id: string) {
    const tag = await this.findOne(id);

    if (!tag) throw new NotFoundException('Tag not found');

    return this.tagsRepository.remove(tag);
  }
}
