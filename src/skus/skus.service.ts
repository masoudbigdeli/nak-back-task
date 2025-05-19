import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { SKU, SkuDocument } from './schemas/sku.schema';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';

@Injectable()
export class SkusService {
  constructor(
    @InjectModel(SKU.name) private readonly skuModel: Model<SkuDocument>
  ) { }

  async create(userId: string, dto: CreateSkuDto): Promise<SKU> {
    const created = new this.skuModel({
      ...dto,
      user: new Types.ObjectId(userId),
    });
    return created.save();
  }

  /** Update only if this user created it */
  async update(id: string, userId: string, dto: UpdateSkuDto): Promise<SKU> {
    const updated = await this.skuModel
      .findOneAndUpdate(
        { _id: id, user: userId },
        dto,
        { new: true },
      )
      .exec();

    if (!updated) {
      throw new NotFoundException('SKU not found or not yours');
    }
    return updated;
  }

  /** List only SKUs created by this user */
  async findAll(userId: string): Promise<SKU[]> {
    const uid = new Types.ObjectId(userId);

    return this.skuModel.find({ user: uid }).exec();
  }

  /** Fetch one SKU by id, only if it belongs to this user */
  async findOne(id: string, userId: string): Promise<SKU> {
    const uid = new Types.ObjectId(userId);
    const skuId = new Types.ObjectId(userId);

    const sku = await this.skuModel
      .findOne({ _id: skuId, user: uid })
      .exec();

    if (!sku) {
      throw new NotFoundException('SKU not found or not yours');
    }
    return sku;
  }
}
