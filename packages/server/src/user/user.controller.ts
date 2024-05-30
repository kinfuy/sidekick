import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ActivationVipDto } from './user.dto';
import { SubscriptionService } from '../subscription/subscription.service';
import { responseCode } from '@/common/configs/constants';
import { AuthGuard } from '../auth/auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(AuthGuard)
  @Post('activationVip')
  async activationVip(@Body() activationVipDto: ActivationVipDto) {
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
}
