import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as blueimpMd5 from 'blueimp-md5';
import { JwtService } from '@nestjs/jwt';
import { UserException } from '@/common/exceptions/custom.exception';
import { responseCode } from '@/common/configs/constants';
import { EmailService } from '@/common/services/email.service';
import { SubscriptionService } from '@/subscription/subscription.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private subscriptionService: SubscriptionService,
  ) {}

  async getToken(payload: any) {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '2m',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
    };
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      return { message: '邮箱需要验证', data: { confirm: true } };
    }
    const pwd = blueimpMd5(`${email}${pass}`);

    if (user.password !== pwd) {
      throw new UserException('用户名或密码错误');
    }

    const payload = { sub: user.id, email: user.name };
    const tokens = await this.getToken(payload);

    const subscription = await this.subscriptionService.getSubscription(email);

    return {
      ...user,
      ...tokens,
      subscription
    };
  }

  async sendVerifyCode(email: string, code) {
    await this.emailService.sendCode(email, code).catch((err) => {
      throw new UserException('验证码发送失败');
    });
    return {
      message:'验证码发送成功'
    };
  }

  async refreshToken(accessToken: string,refreshToken: string) {
    const access = await this.jwtService.verify(accessToken);
    const refresh = await this.jwtService.verify(refreshToken);

    if (!access || !refresh) {
      throw new UserException('无效的token', responseCode.UNAUTHORIZED);
    }
    if(access) return {
      accessToken: access,
      refreshToken: refresh
    }
    const tokens = await this.getToken(refresh);
    return tokens;
  }
}
