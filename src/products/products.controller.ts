import { Controller, Post, Body, UseGuards, Request, Patch, Param, Delete, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from 'src/common/jwt.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly prodService: ProductsService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateProductDto) {
    return this.prodService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body() dto: UpdateProductDto) {
    return this.prodService.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.prodService.remove(id, req.user.userId);
  }

  @Get()
  paginate(@Request() req, @Query() query: PaginationDto) {
    return this.prodService.paginate(req.user.userId, query.page, query.perPage);
  }
}
