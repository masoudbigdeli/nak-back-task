import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Attribute, AttributeDocument } from './schemas/attribute.schema';
import { CreateAttributeDto } from './dto/create-attribute.dto';

@Injectable()
export class AttributesService {
  constructor(
    @InjectModel(Attribute.name) private readonly attrModel: Model<AttributeDocument>,
  ) {}

  async create(userId: string, dto: CreateAttributeDto): Promise<Attribute> {
    const created = new this.attrModel({
      ...dto,
      user: new Types.ObjectId(userId),
    });
    return created.save();
  }

  async findAll(userId: string): Promise<Attribute[]> {
    return this.attrModel.find({ user: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Attribute> {
    const attr = await this.attrModel.findOne({ _id: id, user: userId }).exec();
    if (!attr) throw new NotFoundException('Attribute not found');
    return attr;
  }
}
