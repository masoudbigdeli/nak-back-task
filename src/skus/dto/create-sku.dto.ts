import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// test comment
export class CreateSkuDto {
  @ApiProperty({ example: 'A1' })
  @IsString()
  model: string;

  @ApiProperty({ example: '100' })
  @IsString()
  price: string;

  @ApiProperty({ example: '50' })
  @IsString()
  numberInStock: string;
}
