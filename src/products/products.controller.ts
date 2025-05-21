import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from 'src/common/jwt.guard';

@ApiTags('products')
@Controller('products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class ProductsController {
  constructor(private readonly prodService: ProductsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(@Request() req, @Body() dto: CreateProductDto) {
    return this.prodService.create(req.user.userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() dto: UpdateProductDto,
  ) {
    return this.prodService.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  remove(@Param('id') id: string, @Request() req) {
    return this.prodService.remove(id, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'List products (paginated)' })
  @ApiQuery({ name: 'page', type: Number, example: 1, description: 'Page number' })
  @ApiQuery({ name: 'perPage', type: Number, example: 10, description: 'Items per page' })
  paginate(
    @Request() req,
    @Query() query: PaginationDto,  
  ) {
    return this.prodService.paginate(
      req.user.userId,
      query.page,
      query.perPage,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one product by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.prodService.findOne(id, req.user.userId);
  }
}
