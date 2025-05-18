import { Controller, Post, Body, Patch, UseGuards, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from '@nestjs/swagger';
import { SkusService } from './skus.service';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';
import { JwtAuthGuard } from 'src/common/jwt.guard';

@ApiTags('skus')
@ApiBearerAuth('access-token')
@Controller('skus')
@UseGuards(JwtAuthGuard)
export class SkusController {
  constructor(private readonly skusService: SkusService) { }

  @Post('batch')
  @ApiOperation({ summary: 'Create multiple SKUs' })
  @ApiBody({ type: [CreateSkuDto] })
  createBatch(@Body() dtos: CreateSkuDto[]) {
    return this.skusService.createMany(dtos);
  }

  @Patch('batch')
  @ApiOperation({ summary: 'Update multiple SKUs' })
  @ApiBody({ schema: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, data: { $ref: '#/components/schemas/UpdateSkuDto' } } } } })
  updateBatch(@Body() dtos: { id: string; data: UpdateSkuDto }[]) {
    return this.skusService.updateMany(dtos);
  }

  @Get()
  @ApiOperation({ summary: 'List all SKUs' })
  findAll() {
    return this.skusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one SKU by ID' })
  findOne(@Param('id') id: string) {
    return this.skusService.findOne(id);
  }
}