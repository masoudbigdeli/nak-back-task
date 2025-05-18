import { IsString } from 'class-validator';

export class CreateSkuDto {
  @IsString()
  model: string;

  @IsString()
  price: string;

  @IsString()
  numberInStock: string;
}