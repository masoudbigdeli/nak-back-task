import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { JwtAuthGuard } from 'src/common/jwt.guard';

@Controller('attributes')
@UseGuards(JwtAuthGuard)
export class AttributesController {
  constructor(private readonly attrService: AttributesService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateAttributeDto) {
    return this.attrService.create(req.user.userId, dto);
  }
}