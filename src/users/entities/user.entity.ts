import { Post } from '@/posts/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'users' })
export class User {
  @ApiProperty({
    example: 'fccec8e1-23ba-4426-90b5-13906b5e7b4c',
    description: 'The UUID of User',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'acezombiev4@gmail.com',
    description: 'The email of User',
  })
  @Column('character varying', { length: 100, unique: true })
  email!: string;

  @Column('character varying', { length: 100 })
  @ApiProperty({
    example: 'Password@123',
    description:
      'The password of User (min 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character)',
  })
  password!: string;

  @ApiProperty({
    example: 'Dung',
    description: 'The first name of User (Unicode letters only)',
  })
  @Column('character varying', { length: 64 })
  firstName!: string;

  @ApiProperty({
    example: 'Ho',
    description: 'The last name of User (Unicode letters only)',
  })
  @Column('character varying', { length: 64 })
  lastName!: string;

  @ApiProperty({
    type: String,
    default: null,
    example: 'Hanoi',
    description: 'The address of User (optional)',
  })
  @Column('character varying', { length: 256, nullable: true })
  address: string | null = null;

  @ApiProperty({
    type: String,
    default: null,
    example: 'https://www.example.com/avatar.png',
    description: 'The avatar URL of User (optional)',
  })
  @Column('character varying', { length: 256, nullable: true })
  avatarUrl: string | null = null;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  @ApiProperty({
    default: true,
    description: 'The status of User (default is true)',
  })
  @Column('boolean', { default: 'true' })
  isActive!: boolean;

  @ApiProperty({
    example: '2021-08-01T00:00:00.000Z',
    description: 'The created date of User',
  })
  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @ApiProperty({
    example: '2021-08-01T00:00:00.000Z',
    description: 'The updated date of User',
  })
  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
