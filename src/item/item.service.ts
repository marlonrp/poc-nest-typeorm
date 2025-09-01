import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/utils/dto/page.dto';
import { PageOptionsDto } from 'src/utils/dto/page-options.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto) {
    const { skip, limit } = pageOptionsDto;

    const [entities, itemCount] = await this.itemRepo.findAndCount({
      skip,
      take: limit,
      order: { id: 'ASC' },
    });

    return new PageDto(entities, itemCount, pageOptionsDto);
  }

  async findOne(id: string) {
    const entity = await this.itemRepo.findOneBy({ id });

    if (!entity) throw new NotFoundException(`Id ${id} not found.`);

    return entity;
  }

  async create(item: Item) {
    if (!item?.name?.length) throw new BadRequestException('Name is required');
    if (!item?.description?.length)
      throw new BadRequestException('Description is required');
    if (!item?.price) throw new BadRequestException('Price is required');
    if (!item?.category) throw new BadRequestException('Category is required');
    const category = await this.categoryService.findOne(item.category.id);
    item.category = category;
    const itemEntity = this.itemRepo.create(item);
    return this.itemRepo.save(itemEntity);
  }

  async update(id: string, item: Item) {
    if (
      !item.name?.length &&
      !item.description?.length &&
      !item.price &&
      !item.category
    )
      throw new BadRequestException(
        'Name, Description, Price or Category is required',
      );
    let itemEntity = await this.findOne(id);
    itemEntity = item;
    return this.itemRepo.save(itemEntity);
  }

  remove(id: string) {
    return this.itemRepo.delete(id);
  }
}
