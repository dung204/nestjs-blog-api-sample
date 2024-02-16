import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from '@/tags/dto/create-tag.dto';
import { UpdateTagDto } from '@/tags/dto/update-tag.dto';
import PaginationOptionsDto from '@/common/dto/pagination-options.dto';
import { TagsRepository } from '@/tags/tags.repository';

@Injectable()
export class TagsService {
  constructor(
    @Inject(TagsRepository)
    private tagsRepository: TagsRepository,
  ) {}

  create(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto);
    return this.tagsRepository.save(tag);
  }

  async findAll(paginationOptionsDto: PaginationOptionsDto) {
    return this.tagsRepository.findAllPaginated(paginationOptionsDto);
  }

  async findOne(id: string) {
    const tag = await this.tagsRepository.findOneById(id);

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
