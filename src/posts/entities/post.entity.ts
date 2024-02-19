import { Tag } from '@/tags/entities/tag.entity';
import { User } from '@/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @ApiProperty({
    example: 'c4a4f3e7-0f3d-4d9f-9e6d-3d3f8e0b0e6b',
    description: 'The UUID of the Post',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.posts)
  user!: User;

  @ApiProperty({
    type: () => Tag,
    isArray: true,
  })
  @ManyToMany(() => Tag)
  @JoinTable()
  tags!: Tag[];

  @ApiProperty({
    example: 'Post title',
    description: 'The title of the Post',
  })
  @Column('character varying', { length: 255 })
  title!: string;

  @ApiProperty({
    example: 'Post content',
    description: 'The content of the Post',
    required: false,
  })
  @Column('text', { nullable: true })
  content: string | null = null;

  @ApiProperty({
    example: '2021-08-01T00:00:00.000Z',
    description: 'The date and time the Post was created',
  })
  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @ApiProperty({
    example: '2021-08-01T00:00:00.000Z',
    description: 'The date and time the Post was last updated',
  })
  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
