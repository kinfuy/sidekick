import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateActivationDto, CreateSubscriptionDto, UpdateSubscriptionDto } from './dto/subscription';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}


 @Post('activcation')
 async create(@Body() createActivation: CreateActivationDto) {
   return await this.subscriptionService.createActivation(createActivation.type)
 } 

}
