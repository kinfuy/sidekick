import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  Query,
  Req,
  Session,
} from '@nestjs/common';
import { LoginService } from './service/login.service';
import { LoginDto, RegisterDto, VerifyCodeDto } from './dto/login.dto';
import { responseCode } from './Config/const';

@Controller('')
export class AppController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async login(@Body() parmas: LoginDto) {
    return this.loginService.login(parmas);
  }
  

  @Post('register')
  async register(@Body() parmas: RegisterDto, @Req() req) {
    if (
      !req.session?.code ||
      !req.session?.expireTime ||
      req.session?.code != parmas.verifyCode ||
      req.session?.expireTime < new Date().getTime()
    ) {
      req.session.code = null;
      req.session.expireTime = null;
      return {
        data: null,
        message: '验证码错误或已过期',
        code: responseCode.FAIL,
      };
    }

    return this.loginService.register(parmas);
  }

  @Post('verifyCode')
  async getVerifyCode(@Body() parmas: VerifyCodeDto, @Req() req) {
    const code = Math.floor(Math.random() * 1000000);
    req.session.code = code;
    req.session.expireTime = new Date().getTime() + 60 * 1000 * 5;
    return this.loginService.getVerifyCode(parmas, code);
  }

  @Post('verifyEmail')
  async verifyEmail(@Body() parmas: RegisterDto, @Req() req) {
    if (
      !req.session?.code ||
      !req.session?.expireTime ||
      req.session?.code != parmas.verifyCode ||
      req.session?.expireTime < new Date().getTime()
    ) {
      req.session.code = null;
      req.session.expireTime = null;
      return {
        data: null,
        message: '验证码错误或已过期',
        code: responseCode.FAIL,
      };
    }
    return this.loginService.verifyEmail(parmas);
  }
}
