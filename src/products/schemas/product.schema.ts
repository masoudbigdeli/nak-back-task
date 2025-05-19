import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { SKU } from '../../skus/schemas/sku.schema';

export type ProductDocument = Product & Document;

class Attr {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], required: true })
  values: string[];
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: SKU.name }] })
  skus: Types.ObjectId[];

  @Prop({ type: [Attr], _id: false })
  attributes: Attr[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
