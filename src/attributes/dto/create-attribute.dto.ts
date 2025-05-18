import { IsString, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttributeDto {
  @ApiProperty({ example: 'color' })
  @IsString()
  name: string;

  @ApiProperty({ type: [String], example: ['red', 'blue'] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  values: string[];
}