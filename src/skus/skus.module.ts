import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SkusService } from './skus.service';
import { SkusController } from './skus.controller';
import { SKU, SkuSchema } from './schemas/sku.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SKU.name, schema: SkuSchema }]),
  ],
  providers: [SkusService],
  controllers: [SkusController],
})
export class SkusModule {}
