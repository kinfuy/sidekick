import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import {
  CreateActivationDto,
} from './dto/subscription';
import { AFDianService } from '@/common/services/afdian.service';
import {  Public, Roles } from '@/auth/auth.guard';
import { NoTransformInterceptor } from '@/common/interceptors/noTransform.interceptor';
import { Throttle } from '@nestjs/throttler';
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService,private readonly afdianService: AFDianService) {}

  @Post('activcation')
  async create(@Body() createActivation: CreateActivationDto) {
    return await this.subscriptionService.createActivation(
      createActivation.type,
    );
  }

  @Post('afdian')
  @Public()
  @UseInterceptors(NoTransformInterceptor)
  async afdianWebhook(@Body() body) {
    return await this.afdianService.webhook();
  }

}
