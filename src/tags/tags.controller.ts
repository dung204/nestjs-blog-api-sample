import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { TagsService } from '@/tags/tags.service';
import { CreateTagDto } from '@/tags/dto/create-tag.dto';
import { UpdateTagDto } from '@/tags/dto/update-tag.dto';
import PaginationOptionsDto from '@/common/dto/pagination-options.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  findAll(@Query() paginationOptionsDto: PaginationOptionsDto) {
    return this.tagsService.findAll(paginationOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.tagsService.remove(id);
  }
}
