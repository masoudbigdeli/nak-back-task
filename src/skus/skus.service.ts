import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SKU } from './sku.entity';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';

@Injectable()
export class SkusService {
  constructor(
    @InjectRepository(SKU)
    private readonly skuRepo: Repository<SKU>,
  ) {}

  async createMany(dtos: CreateSkuDto[]): Promise<string[]> {
    const skus = this.skuRepo.create(dtos);
    const saved = await this.skuRepo.save(skus);
    return saved.map(s => s.id);
  }

  async updateMany(dtos: { id: string; data: UpdateSkuDto }[]): Promise<SKU[]> {
    const results: SKU[] = [];
    for (const { id, data } of dtos) {
      const sku = await this.skuRepo.findOne({ where: { id } });
      if (!sku) throw new NotFoundException(`SKU ${id} not found`);
      Object.assign(sku, data);
      results.push(await this.skuRepo.save(sku));
    }
    return results;
  }
}
