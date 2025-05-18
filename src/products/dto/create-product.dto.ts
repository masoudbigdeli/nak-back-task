import { IsString, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AttrDto {
  @ApiProperty({ example: 'color', description: 'Name of the attribute' })
  @IsString()
  name: string;

  @ApiProperty({
    type: [String],
    example: ['red', 'blue'],
    description: 'Allowed values for this attribute',
  })
  @IsArray()
  @ArrayNotEmpty()
  values: string[];
}

export class CreateProductDto {
  @ApiProperty({ example: 'T-Shirt', description: 'Name of the product' })
  @IsString()
  name: string;

  @ApiProperty({
    type: [String],
    example: ['skuId1', 'skuId2'],
    description: 'List of SKU IDs for this product',
  })
  @IsArray()
  @ArrayNotEmpty()
  skusIds: string[];

  @ApiProperty({
    type: [AttrDto],
    description: 'Array of attribute objects with name & values',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttrDto)
  attributes: AttrDto[];
}
