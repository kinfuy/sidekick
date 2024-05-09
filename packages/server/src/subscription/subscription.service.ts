import { Injectable } from '@nestjs/common';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from './dto/subscription';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { Activation } from './entities/activation.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)  private subscription: Repository<Subscription>,
    @InjectRepository(Activation) private activation: Repository<Activation>,
  ) {}

  // 检查激活码
  async checkActivation(code: string) {
    const activation = await this.activation.findOne({ where: { code: code } });
    if (activation) {
      activation.effective = true;
      return true;
    }
  }

  async createByCode(createSubscriptionDto: CreateSubscriptionDto) {
    const { code, userId } = createSubscriptionDto;
    const activation = await this.activation.findOne({ where: { code: code } });
    if (!activation) {
      return {
        success: false,
        message: '激活码不存在',
      };
    }
    if (!activation.effective) {
      return {
        success: false,
        msg: '激活码已被使用',
      };
    }
    const subscription = new Subscription();
    subscription.form = 1;
    subscription.type = activation.type;
    subscription.startTime = new Date();
    subscription.userId = userId;
    subscription.createTime = new Date();
    subscription.updateTime = new Date();
    await this.subscription.save(subscription);
  }

  async getSubscription(userId: number) {
    const subscription = await this.subscription.findOne({
      select: ['type', 'endTime'],
      where: { userId: userId },
    });

    return {
      success: true,
      data: {
        type: subscription.type,
        endTime: subscription.endTime,
      }
    }
  }
}
