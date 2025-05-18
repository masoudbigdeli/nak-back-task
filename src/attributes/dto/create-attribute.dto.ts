import { IsString, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class CreateAttributeDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  values: string[];
}
