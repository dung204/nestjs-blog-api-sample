import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '@/posts/dto/create-post.dto';
import { UpdatePostDto } from '@/posts/dto/update-post.dto';
import { UsersService } from '@/users/users.service';
import { TagsService } from '@/tags/tags.service';
import PaginationOptionsDto from '@/common/dto/pagination-options.dto';
import { PostsRepository } from '@/posts/posts.repository';

@Injectable()
export class PostsService {
  private readonly logger: Logger = new Logger(PostsService.name);

  constructor(
    @Inject(PostsRepository)
    private readonly postsRepository: PostsRepository,
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const { userId, tagIds, title, content } = createPostDto;

    const user = await this.usersService.findOne(userId);

    const tags = !tagIds ? [] : await this.tagsService.findSome(tagIds);

    const post = this.postsRepository.create({
      title,
      content,
      user,
      tags,
    });

    return this.postsRepository.save(post);
  }

  async findAll(paginationOptionsDto: PaginationOptionsDto) {
    return this.postsRepository.findAllPaginated(paginationOptionsDto);
  }

  async findOne(id: string) {
    const post = await this.postsRepository.findOneById(id);

    if (!post) throw new NotFoundException('Post not found!');

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const { title, content, tagIds } = updatePostDto;
    const post = await this.findOne(id);

    if (tagIds) {
      post.tags = await Promise.all(
        tagIds.map((tagId) => this.tagsService.findOne(tagId)),
      );
    }
    if (title) post.title = title;
    if (content) post.content = content;

    return this.postsRepository.save(post);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('Post not found!');

    return this.postsRepository.remove(user);
  }
}
