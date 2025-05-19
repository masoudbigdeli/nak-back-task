import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { Attribute, AttributeSchema } from './schemas/attribute.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Attribute.name, schema: AttributeSchema }]),
  ],
  providers: [AttributesService],
  controllers: [AttributesController],
})
export class AttributesModule {}
