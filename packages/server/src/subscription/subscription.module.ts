import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Activation } from './entities/activation.entity';
import { AFDianService } from '@/common/services/afdian.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule,TypeOrmModule.forFeature([Subscription, Activation])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService,AFDianService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
