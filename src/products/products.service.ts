import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from 'src/users/user.entity';
import { SKU } from 'src/skus/sku.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly prodRepo: Repository<Product>,
  ) {}

  async create(userId: string, dto: CreateProductDto): Promise<Product> {
    const prod = this.prodRepo.create({
      name: dto.name,
      user: { id: userId } as User,
      skus: dto.skusIds.map(id => ({ id } as SKU)),
      attributes: dto.attributes,
    });
    return this.prodRepo.save(prod);
  }

  async update(id: string, userId: string, dto: UpdateProductDto): Promise<Product> {
    const prod = await this.prodRepo.findOne({ where: { id, user: { id: userId } as any } });
    if (!prod) throw new NotFoundException('Product not found');
    if (dto.name) prod.name = dto.name;
    if (dto.skusIds) prod.skus = dto.skusIds.map(i => ({ id: i } as SKU));
    if (dto.attributes) prod.attributes = dto.attributes;
    return this.prodRepo.save(prod);
  }

  async remove(id: string, userId: string): Promise<void> {
    const res = await this.prodRepo.delete({ id, user: { id: userId } as any });
    if (res.affected === 0) throw new NotFoundException('Product not found');
  }

  async paginate(userId: string, page: number, perPage: number) {
    const [items, total] = await this.prodRepo.findAndCount({
      where: { user: { id: userId } as any },
      skip: (page - 1) * perPage,
      take: perPage,
      relations: ['skus'],
    });
    return { items, total, page, perPage };
  }
}