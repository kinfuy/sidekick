import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserException } from '@/common/exceptions/custom.exception';
import { responseCode } from '@/common/configs/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return new UserException(responseCode.FAIL, '用户不存在');
    }
    const payload = { sub: user.id, username: user.name };
    return {
      ...user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
