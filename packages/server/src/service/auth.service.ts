import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  /**
   * 获取Token
   * @param payload 
   * @param expiresIn 
   * @returns 
   */
  async getToken(payload:any, expiresIn: string) {
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: expiresIn,
      }),
    };
  }

  /**
   * 验证
   * @param token 
   * @returns 
   */
  async verifyToken(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
