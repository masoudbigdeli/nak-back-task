import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';
import { SkusModule } from '../skus/skus.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), SkusModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}