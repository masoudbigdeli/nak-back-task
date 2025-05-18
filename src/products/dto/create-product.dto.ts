import { IsString, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AttrDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  values: string[];
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  skusIds: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttrDto)
  attributes: AttrDto[];
}
