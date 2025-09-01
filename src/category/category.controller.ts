import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ValidationPipe,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { PageDto } from 'src/utils/dto/page.dto';
import { PageOptionsDto } from 'src/utils/dto/page-options.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() category: Category) {
    return this.categoryService.create(category);
  }

  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true })) // must convert query string to dto object
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Category>> {
    return this.categoryService.findAll(pageOptionsDto);
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
    return this.categoryService.findOne(id);
  }

  @Put(':id')
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
    @Body() category: Category,
  ) {
    return this.categoryService.update(id, category);
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
    return this.categoryService.remove(id);
  }
}
