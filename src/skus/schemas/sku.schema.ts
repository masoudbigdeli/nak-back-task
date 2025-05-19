import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type SkuDocument = SKU & Document;

@Schema({ timestamps: true })
export class SKU {
    @Prop({ required: true })
    model: string;

    @Prop({ required: true })
    price: string;

    @Prop({ required: true })
    numberInStock: string;

    // ← New: who created this SKU
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user: Types.ObjectId;
}

export const SkuSchema = SchemaFactory.createForClass(SKU);
