import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID' })
  id: string;
  @Column({ length: 100 })
  @ApiProperty({ description: 'Category name' })
  name: string;
  @Column('text')
  @ApiProperty({ description: 'Category description' })
  description: string;
}
