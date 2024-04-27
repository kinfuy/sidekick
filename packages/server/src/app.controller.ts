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
  async register(
    @Body() parmas: RegisterDto,
    @Session() session: any,
  ) {
    if(session.code != parmas.verifyCode || session.expireTime < new Date().getTime()){
      return {
        data: null,
        message: '验证码错误或已过期',
        code: responseCode.FAIL,
      }
    }
   
    return this.loginService.register(parmas);
  }

  @Post('verifyCode')
  async getVerifyCode(@Body() parmas: VerifyCodeDto, @Session() session: any) {
    debugger
    const code = Math.floor(Math.random() * 1000000);
    session.code = code;
    session.expireTime = new Date().getTime() + 60 * 1000;
    return this.loginService.getVerifyCode(parmas, code);
  }
}
