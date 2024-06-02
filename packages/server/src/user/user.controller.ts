import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ActivationVipDto } from './user.dto';
import { SubscriptionService } from '../subscription/subscription.service';
import { AuthGuard } from '../auth/auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(AuthGuard)
  @Post('activationVip')
  async activationVip(@Body() activationVipDto: ActivationVipDto) {
    return await this.subscriptionService.createByCode({
      code: activationVipDto.code,
      email: activationVipDto.email,
    });
  }
}
