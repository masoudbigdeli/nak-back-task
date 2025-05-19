import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { SkusService } from './skus.service';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';
import { JwtAuthGuard } from 'src/common/jwt.guard';

@ApiTags('skus')
@Controller('skus')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class SkusController {
  constructor(private readonly skusService: SkusService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new SKU' })
  create(@Body() dto: CreateSkuDto) {
    return this.skusService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing SKU' })
  update(@Param('id') id: string, @Body() dto: UpdateSkuDto) {
    return this.skusService.update(id, dto);
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
