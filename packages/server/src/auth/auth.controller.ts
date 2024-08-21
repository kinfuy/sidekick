import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, TokenDto, VerifyCodeDto } from './auto.dto';
import {  Public } from '@/auth/auth.guard';
import { UserService } from '@/user/user.service';
import { UserException } from '@/common/exceptions/custom.exception';
import { Throttle } from '@nestjs/throttler';
@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('login')
  @Throttle({ long: { limit: 5, ttl: 5 * 60 * 1000 } })
  async signIn(@Body() signInDto: LoginDto, @Req() req) {    

    const user = await this.authService.signIn(signInDto.email, signInDto.password);
    if(!user.data.confirm) {
      req.session.user = {
        email: user.email,
        id: user.id,
        role: user.role,
        name: user.name
      } 
    }
    return user
  }

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<void> {
    await this.userService.register(dto);
  }

  @Public()
  @Post('refreshToken')
  async refreshToken(@Body() parmas: TokenDto) {
    return await this.authService.refreshToken(parmas.accessToken, parmas.refreshToken)
  }

  @Public()
  @Post('sendCode')
  @Throttle({ long: { limit: 5, ttl: 5 * 60 * 1000 } })
  async sendCode(@Body() parmas: VerifyCodeDto, @Req() req) {
    const code = Math.floor(Math.random() * 1000000);
    req.session.code = code;
    req.session.expireTime = new Date().getTime() + 60 * 1000 * 5;
    await this.authService.sendVerifyCode(parmas.email, code)
  }


  @Public()
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
      throw new UserException('验证码错误或已过期')
    }    
    return await this.userService.verifyEmail(parmas)
  }

}
