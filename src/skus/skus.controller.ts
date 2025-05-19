import {
  Controller, Post, Body, Patch, Param,
  Get, Request, UseGuards
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation
} from '@nestjs/swagger';

import { SkusService } from './skus.service';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';
import { JwtAuthGuard } from 'src/common/jwt.guard';

@ApiTags('skus')
@Controller('skus')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class SkusController {
  constructor(private readonly skusService: SkusService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new SKU' })
  create(
    @Request() req,
    @Body() dto: CreateSkuDto,
  ) {
    return this.skusService.create(req.user.userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing SKU' })
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() dto: UpdateSkuDto,
  ) {
    return this.skusService.update(id, req.user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all SKUs for current user' })
  findAll(@Request() req) {
    return this.skusService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one SKU by ID (only if yours)' })
  findOne(
    @Param('id') id: string,
    @Request() req,
  ) {
    return this.skusService.findOne(id, req.user.userId);
  }
}
