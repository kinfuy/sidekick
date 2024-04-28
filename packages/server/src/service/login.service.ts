import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto, VerifyCodeDto } from '../dto/login.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import blueimpMd5 from 'blueimp-md5';
import { responseCode } from '../Config/const';
import { EmailService } from './email.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private userModel: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async login(params: LoginDto) {
    const { email, password } = params;
    const user = await this.userModel
      .createQueryBuilder('user')
      .where({ email: email, isDelete: false })
      .addSelect('user.password')
      .getOne();

    if (user) {
      const pwd = blueimpMd5(email + password);
      if (user.password === pwd) {
        return {
          data: {
            ...user,
          },
          message: '登录成功',
          code: responseCode.SUCCESS,
        };
      }
    }
    return {
      data: null,
      message: '用户名或密码错误',
      code: responseCode.FAIL,
    };
  }

  async register(params: RegisterDto) {
    const { email, password } = params;
    const oldUser = await this.userModel.findOne({
      where: {
        email: email,
      },
    });
    if (oldUser) {
      return {
        data: null,
        message: '邮箱已存在',
        code: responseCode.FAIL,
      };
    }
    const user = new User();
    user.email = email;
    user.password = blueimpMd5(email + password);
    user.updateTime = new Date();
    user.name = '鱼大';
    this.userModel.save(user);
    return {
      data: null,
      message: '注册成功',
      code: responseCode.SUCCESS,
    };
  }

  async getVerifyCode(params: VerifyCodeDto, code:number) {
    if(!params.email){
      return {
        data: null,
        message: '邮箱不能为空',
        code: responseCode.FAIL,
      }
    }

    await this.emailService.sendCode(params.email, code);
    return {
      data: code,
      message: '验证码发送成功',
      code: responseCode.SUCCESS,
    }
  }

  async validateUser() {}
}
