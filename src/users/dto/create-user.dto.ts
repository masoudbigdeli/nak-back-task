import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @MinLength(4)
  userName: string;

  @IsString()
  @MinLength(6)
  password: string;
}