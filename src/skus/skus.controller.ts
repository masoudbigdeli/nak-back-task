import { Controller, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { SkusService } from './skus.service';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';
import { JwtAuthGuard } from 'src/common/jwt.guard';

@Controller('skus')
@UseGuards(JwtAuthGuard)
export class SkusController {
  constructor(private readonly skusService: SkusService) {}

  @Post('batch')
  createBatch(@Body() dtos: CreateSkuDto[]) {
    return this.skusService.createMany(dtos);
  }

  @Patch('batch')
  updateBatch(@Body() dtos: { id: string; data: UpdateSkuDto }[]) {
    return this.skusService.updateMany(dtos);
  }
}