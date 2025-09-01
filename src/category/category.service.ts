import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { PageOptionsDto } from 'src/utils/dto/page-options.dto';
import { PageDto } from 'src/utils/dto/page.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto) {
    const { skip, limit } = pageOptionsDto;

    const [entities, itemCount] = await this.categoryRepo.findAndCount({
      skip,
      take: limit,
      order: { id: 'ASC' },
    });

    return new PageDto(entities, itemCount, pageOptionsDto);
  }

  async findOne(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`Invalid UUID: ${id}`);

    const entity = await this.categoryRepo.findOneBy({ id });

    if (!entity) throw new NotFoundException(`Category Id ${id} not found.`);

    return entity;
  }

  create(category: Category) {
    if (!category?.name?.length)
      throw new BadRequestException('Name is required');
    if (!category?.description?.length)
      throw new BadRequestException('Description is required');
    const categoryEntity = this.categoryRepo.create(category);
    return this.categoryRepo.save(categoryEntity);
  }

  async update(id: string, category: Category) {
    if (!category?.name?.length && !category?.description?.length)
      throw new BadRequestException('Name or Description is required');
    let categoryEntity = await this.findOne(id);
    categoryEntity = {
      ...categoryEntity,
      ...category,
    };
    return this.categoryRepo.save(categoryEntity);
  }

  remove(id: string) {
    return this.categoryRepo.delete(id);
  }
}
