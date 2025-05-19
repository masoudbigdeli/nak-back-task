import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { JwtAuthGuard } from 'src/common/jwt.guard';

@ApiTags('attributes')
@Controller('attributes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class AttributesController {
  constructor(private readonly attrService: AttributesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new attribute' })
  create(@Request() req, @Body() dto: CreateAttributeDto) {
    return this.attrService.create(req.user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all attributes for user' })
  findAll(@Request() req) {
    return this.attrService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single attribute by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.attrService.findOne(id, req.user.userId);
  }
}
