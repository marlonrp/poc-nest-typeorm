import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Item {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID' })
  id: string;
  @Column({ length: 100 })
  @ApiProperty({ description: 'Item name' })
  name: string;
  @Column('text')
  @ApiProperty({ description: 'Item description' })
  description: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({ description: 'Item price' })
  price: number;
  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'category_id' })
  @ApiProperty({ description: 'Item category' })
  category: Category;
}
