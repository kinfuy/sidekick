import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ActivationVipDto, CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.dto';
import { SubscriptionService } from '../subscription/subscription.service';
import { responseCode } from '../config/const';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly subscriptionService: SubscriptionService) {}


  @Post('activationVip')
  async activationVip(@Param() activationVipDto: ActivationVipDto) {
    const res = await this.subscriptionService.createByCode({
      code: activationVipDto.code,
      email: activationVipDto.email,
    });
    if(!res.success) {
      return {
        data: null,
        message: res.message,
        code: responseCode.FAIL,
      }
    }
  
    return {
      data: res.data,
      message: '激活成功',
      code: responseCode.SUCCESS,
    }
    
  }

  findAll() {
    return this.userService.findAll();
  }
}
