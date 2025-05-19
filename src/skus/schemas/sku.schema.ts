import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkuDocument = SKU & Document;

@Schema({ timestamps: true })
export class SKU {
  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  numberInStock: string;
}

export const SkuSchema = SchemaFactory.createForClass(SKU);
