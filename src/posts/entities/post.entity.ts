import { Tag } from '@/tags/entities/tag.entity';
import { User } from '@/users/entities/user.entity';
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
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.posts)
  user!: User;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags!: Tag[];

  @Column('character varying', { length: 255 })
  title!: string;

  @Column('text', { nullable: true })
  content: string | null = null;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
