// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Log in and receive a JWT' })
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto) {
    // Validate the credentials manually
    const user = await this.authService.validateUser(dto.userName, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Now login() will receive a real user object
    return this.authService.login(user);
  }
}
