import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly prodModel: Model<ProductDocument>,
  ) { }

  async create(userId: string, dto: CreateProductDto): Promise<Product> {
    const created = new this.prodModel({
      name: dto.name,
      user: new Types.ObjectId(userId),
      skus: dto.skusIds.map(id => new Types.ObjectId(id)),
      attributes: dto.attributes,
    });
    return created.save();
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateProductDto,
  ): Promise<Product> {
    const uid = new Types.ObjectId(userId);
    const productId = new Types.ObjectId(id);
    const updated = await this.prodModel
      .findOneAndUpdate(
        { _id: productId, user: uid },
        {
          ...(dto.name && { name: dto.name }),
          ...(dto.skusIds && {
            skus: dto.skusIds.map(i => new Types.ObjectId(i)),
          }),
          ...(dto.attributes && { attributes: dto.attributes }),
        },
        { new: true },
      )
      .exec();
    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }

  async remove(id: string, userId: string): Promise<void> {
    const uid = new Types.ObjectId(userId);
    const productId = new Types.ObjectId(id);
    const res = await this.prodModel
      .deleteOne({ _id: productId, user: uid })
      .exec();
    if (res.deletedCount === 0) throw new NotFoundException('Product not found');
  }

  async findOne(id: string, userId: string): Promise<Product> {
    const uid = new Types.ObjectId(userId);
    const productId = new Types.ObjectId(id);
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Product not found');
    }
    const product = await this.prodModel
      .findOne({ _id: productId, user: uid })
      .exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async paginate(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<{ items: Product[]; total: number; page: number; perPage: number }> {
    const uid = new Types.ObjectId(userId);

    const filter = { user: uid };
    const total = await this.prodModel.countDocuments(filter).exec();
    const items = await this.prodModel
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    return { items, total, page, perPage };
  }
}
