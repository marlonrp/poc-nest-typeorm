import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  BadRequestException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { PageDto } from 'src/utils/dto/page.dto';
import { PageOptionsDto } from 'src/utils/dto/page-options.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() item: Item) {
    return this.itemService.create(item);
  }

  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) // must convert query string to dto object
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Item>> {
    return this.itemService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: undefined,
        exceptionFactory: () =>
          new BadRequestException('Invalid ID must be UUID format'),
      }),
    )
    id: string,
  ) {
    return this.itemService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: undefined,
        exceptionFactory: () =>
          new BadRequestException('Invalid ID must be UUID format'),
      }),
    )
    id: string,
    @Body() item: Item,
  ) {
    return this.itemService.update(id, item);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: undefined,
        exceptionFactory: () =>
          new BadRequestException('Invalid ID must be UUID format'),
      }),
    )
    id: string,
  ) {
    return this.itemService.remove(id);
  }
}
