import { Injectable } from '@nestjs/common';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from './dto/subscription';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { Activation } from './entities/activation.entity';
import dayjs from 'dayjs'


/**
 * 根据激活码设置有效期
 * @param val 
 * @param type 
 * @returns 
 */
const setEffectTime = (val:Date, type: number) => {
    if(type === 1){
        return dayjs(val).add(1, 'month').toDate()
    }
    if(type === 2){
        return dayjs(val).add(3, 'month').toDate()
    }
    if(type === 3){
        return dayjs(val).add(1, 'year').toDate()
    }
    if(type === 4){
        return dayjs(val).add(1, 'week').toDate()
    }
    if(type === 99){
        return dayjs('2999-12-31').toDate()
    }
    return val
}

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
    const { code, email } = createSubscriptionDto;
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
    subscription.endTime = setEffectTime(new Date(), activation.type);
    subscription.email = email;
    subscription.createTime = new Date();
    subscription.updateTime = new Date();
    await this.subscription.save(subscription);
  }

  async getSubscription(email: string) {
    const subscription = await this.subscription.findOne({
      select: ['type','form','startTime','lastTime', 'endTime'],
      where: { email: email },
    });
    if(subscription){
      return {
        success: true,
        data: {
          ...subscription,
          isEffective: subscription.endTime.getTime() > new Date().getTime()
        }
      }
    }
    return {
      success: false,
      data: null
    }
  }
}
