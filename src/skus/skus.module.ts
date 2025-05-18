import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkusService } from './skus.service';
import { SkusController } from './skus.controller';
import { SKU } from './sku.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SKU])],
  providers: [SkusService],
  controllers: [SkusController],
  exports: [SkusService],
})
export class SkusModule {}