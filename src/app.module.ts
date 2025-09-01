import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { CategoryModule } from './category/category.module';
import { Item } from './item/entities/item.entity';
import { Category } from './category/entities/category.entity';

@Module({
  imports: [
    ItemModule,
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-polished-darkness-adpycmcy-pooler.c-2.us-east-1.aws.neon.tech',
      port: 5432,
      username: 'neondb_owner',
      password: 'npg_yGY5hzkq1XvO',
      database: 'ecommerce',
      entities: [Item, Category],
      synchronize: true,
      ssl: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
