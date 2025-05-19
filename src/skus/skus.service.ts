import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SKU, SkuDocument } from './schemas/sku.schema';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';

@Injectable()
export class SkusService {
  constructor(@InjectModel(SKU.name) private readonly skuModel: Model<SkuDocument>) {}

  async create(dto: CreateSkuDto): Promise<SKU> {
    const created = new this.skuModel(dto);
    return created.save();
  }

  async update(id: string, dto: UpdateSkuDto): Promise<SKU> {
    const updated = await this.skuModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException('SKU not found');
    return updated;
  }

  async findAll(): Promise<SKU[]> {
    return this.skuModel.find().exec();
  }

  async findOne(id: string): Promise<SKU> {
    const sku = await this.skuModel.findById(id).exec();
    if (!sku) throw new NotFoundException('SKU not found');
    return sku;
  }
}
