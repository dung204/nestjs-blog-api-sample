import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { Post as PostEntity } from '@/posts/entities/post.entity';
import { PostsService } from '@/posts/posts.service';
import { CreatePostDto } from '@/posts/dto/create-post.dto';
import { UpdatePostDto } from '@/posts/dto/update-post.dto';
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
  ApiTags,
} from '@nestjs/swagger';
import { ApiOkPaginatedResponse } from '@/common/decorators/api-ok-paginated-response.decorator';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreatePostDto })
  @ApiCreatedResponse({
    description: 'The post has been successfully created.',
    type: PostEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkPaginatedResponse(PostEntity)
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Get()
  findAll(@Query() paginationOptionsDto: PaginationOptionsDto) {
    return this.postsService.findAll(paginationOptionsDto);
  }

  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiOkResponse({
    description: 'The post has been successfully retrieved.',
    type: PostEntity,
  })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiBody({ type: UpdatePostDto, required: false })
  @ApiOkResponse({
    description: 'The post has been successfully updated.',
    type: PostEntity,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiNoContentResponse({
    description: 'The post has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
