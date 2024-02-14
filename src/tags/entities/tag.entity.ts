import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags', { schema: 'public' })
export class Tag {
  @ApiProperty({
    example: '5bc4c233-4bec-437c-b38d-7834f0e8ada4',
    description: 'The unique ID of the tag',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'JavaScript',
    description: 'The name of the tag (Unicode letters only)',
  })
  @Column('character varying', { length: 100 })
  name!: string;

  @ApiProperty({
    example: "The world's most misunderstood programming language",
    description: 'The description of the tag (optional)',
  })
  @Column('text', { nullable: true })
  description: string | null = null;

  @ApiProperty({
    example: '2021-08-29T00:00:00.000Z',
    description: 'The date and time when the tag was created',
  })
  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @ApiProperty({
    example: '2021-08-29T00:00:00.000Z',
    description: 'The date and time when the tag was last updated',
  })
  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
