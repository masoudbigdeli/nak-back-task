import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'jdoe', description: 'Username of the user' })
  @IsString()
  userName: string;

  @ApiProperty({ example: 'secret123', description: 'User password' })
  @IsString()
  password: string;
}
