import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ActivationVipDto, CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.dto';
import { SubscriptionService } from '../subscription/subscription.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly subscriptionService: SubscriptionService) {}


  @Post('activationVip')
  async activationVip(@Param() activationVipDto: ActivationVipDto) {
    const res = await this.subscriptionService.createByCode({
      code: activationVipDto.code,
      email: activationVipDto.email,
    });
    
  }

  findAll() {
    return this.userService.findAll();
  }
}
