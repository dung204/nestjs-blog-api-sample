import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('character varying', { length: 100, unique: true })
  email!: string;

  @Column('character varying', { length: 100 })
  password!: string;

  @Column('character varying', { length: 64 })
  firstName!: string;

  @Column('character varying', { length: 64 })
  lastName!: string;

  @Column('character varying', { length: 256, nullable: true })
  address: string | null = null;

  @Column('character varying', { length: 256, nullable: true })
  avatarUrl: string | null = null;

  @Column('boolean', { default: 'true' })
  isActive!: boolean;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
