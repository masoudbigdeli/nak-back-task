import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(userName: string, pass: string) {
    const user = await this.usersService.findByUsername(userName);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...u } = user.toObject();
      return u;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.userName, sub: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
