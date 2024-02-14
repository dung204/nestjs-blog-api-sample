import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TagsService } from '@/tags/tags.service';
import { CreateTagDto } from '@/tags/dto/create-tag.dto';
import { UpdateTagDto } from '@/tags/dto/update-tag.dto';
import PaginationOptionsDto from '@/common/dto/pagination-options.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApiOkPaginatedResponse } from '@/common/decorators/api-ok-paginated-response.decorator';
import { Tag } from '@/tags/entities/tag.entity';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({ summary: 'Create a tag' })
  @ApiBody({ type: CreateTagDto })
  @ApiCreatedResponse({ description: 'The tag has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Invalid tag data.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @ApiOperation({ summary: 'Get all tags' })
  @ApiOkPaginatedResponse(Tag)
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Get()
  findAll(@Query() paginationOptionsDto: PaginationOptionsDto) {
    return this.tagsService.findAll(paginationOptionsDto);
  }

  @ApiOperation({ summary: 'Get a tag by ID' })
  @ApiParam({ name: 'id', description: 'The tag ID' })
  @ApiOkResponse({ type: Tag })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a tag by ID' })
  @ApiParam({ name: 'id', description: 'The tag ID' })
  @ApiBody({ type: UpdateTagDto, required: false })
  @ApiOkResponse({ type: Tag })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  @ApiOperation({ summary: 'Delete a tag by ID' })
  @ApiParam({ name: 'id', description: 'The tag ID' })
  @ApiNoContentResponse({
    description: 'The tag has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Tag not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(id);
  }
}
