import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type AttributeDocument = Attribute & Document;

@Schema({ timestamps: true })
export class Attribute {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], required: true })
  values: string[];

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);
