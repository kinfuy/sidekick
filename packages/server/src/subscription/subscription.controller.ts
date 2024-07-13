import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import {
  CreateActivationDto,
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from './dto/subscription';
import { AFDianService } from '@/common/services/afdian.service';
import { Public } from '@/auth/auth.guard';

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
  async afdianWebhook(@Body() body) {
    console.log(body);
    return {
      __noTransform__: true,
      data: { ec: 200 },
    };
  }

  @Get('token')
  @Public()
  async token() {
    return await this.afdianService.query();
  }
}
