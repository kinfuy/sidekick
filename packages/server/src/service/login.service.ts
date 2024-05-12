import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto, VerifyCodeDto } from '../dto/login.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as blueimpMd5 from 'blueimp-md5';
import { responseCode } from '../config/const';
import { EmailService } from './email.service';
import { SubscriptionService } from '../subscription/subscription.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private userModel: Repository<User>,
    private readonly emailService: EmailService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  async login(params: LoginDto) {
    const { email, password } = params;
    const user = await this.userModel
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.sex', 'user.mobile','user.name'])
      .where({ email: email, isDelete: false })
      .addSelect('user.password')
      .getOne();
      
    const {data} = await this.subscriptionService.getSubscription(email);

    if (user) {
      const pwd = blueimpMd5(`${email}${password}`);
      if (user.password === pwd) {
        return {
          data: {
            email: user.email,
            sex: user.sex,
            mobile: user.mobile,
            id: user.id,
            name: user.name,
            subscription: data
          },
          message: '登录成功',
          code: responseCode.SUCCESS,
        };
      } else {
        return {
          data: null,
          message: '用户名或密码错误',
          code: responseCode.FAIL,
        };
      }
    } else {
      return {
        data: {
          confirm: true,
        },
        message: '邮箱需要验证',
        code: responseCode.SUCCESS,
      };
    }
  }

  async register(params: RegisterDto) {
    const { email, password } = params;
    const oldUser = await this.userModel.findOne({
      where: { email: email },
    });
    const user = oldUser ?? new User();
    if (!oldUser) {
      user.email = email;
    }
    user.updateTime = new Date();
    user.password = blueimpMd5(`${email}${password}`);
    this.userModel.save(user);
    return {
      data: {
        email: email,
        avatar: '',
        description: '',
      },
      message: '注册成功',
      code: responseCode.SUCCESS,
    };
  }

  async getVerifyCode(params: VerifyCodeDto, code: number) {
    if (!params.email) {
      return {
        data: null,
        message: '邮箱不能为空',
        code: responseCode.FAIL,
      };
    }

    await this.emailService.sendCode(params.email, code).catch((e) => {
      return {
        data: null,
        message: '验证码发送失败',
        code: responseCode.FAIL,
      };
    });
    return {
      data: null,
      message: '验证码发送成功',
      code: responseCode.SUCCESS,
    };
  }

  async verifyEmail(params: RegisterDto) {
    return this.register(params);
  }
}
