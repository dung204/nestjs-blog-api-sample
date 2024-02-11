import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags', { schema: 'public' })
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('character varying', { length: 100 })
  name!: string;

  @Column('text', { nullable: true })
  description: string | null = null;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
