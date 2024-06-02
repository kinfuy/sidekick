import { Injectable } from '@nestjs/common';
import {
  CreateSubscriptionDto,
} from './dto/subscription';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { Activation } from './entities/activation.entity';
import * as dayjs from 'dayjs';
import { UserException } from '@/common/exceptions/custom.exception';
import { responseCode } from '@/common/configs/constants';

/**
 * 根据激活码设置有效期
 * @param val
 * @param type
 * @returns
 */
const setEffectTime = (val: Date, type: number) => {
  if (type === 1) {
    return dayjs(val).add(1, 'month').toDate();
  }
  if (type === 2) {
    return dayjs(val).add(3, 'month').toDate();
  }
  if (type === 3) {
    return dayjs(val).add(1, 'year').toDate();
  }
  if (type === 4) {
    return dayjs(val).add(1, 'week').toDate();
  }
  if (type === 99) {
    return dayjs('2999-12-31').toDate();
  }
  return val;
};

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscription: Repository<Subscription>,
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
    if (!activation || !activation.effective) {
      throw new UserException('无效激活码');
    }
    let subscription = await this.subscription.findOne({
      where: { email: email },
    });
    if (!subscription) {
      subscription = new Subscription();
      subscription.form = 1;
      subscription.startTime = new Date();
      subscription.email = email;
      subscription.createTime = new Date();
      subscription.updateTime = new Date();
      await this.subscription.save(subscription);
    }
    subscription.type = activation.type;
    subscription.endTime = setEffectTime(
      subscription.endTime || new Date(),
      activation.type,
    );
    await this.subscription.save(subscription);
    await this.activation.update(activation.id, { effective: false });
    return {
      type: subscription.type,
      form: subscription.form,
      startTime: subscription.startTime,
      lastTime: subscription.lastTime,
      endTime: subscription.endTime,
      isEffective: subscription.endTime.getTime() > new Date().getTime(),
    };
  }

  async getSubscription(email: string) {
    const subscription = await this.subscription.findOne({
      select: ['type', 'form', 'startTime', 'lastTime', 'endTime'],
      where: { email: email },
    });
    if (subscription) {
      return  {
        ...subscription,
        isEffective: subscription.endTime.getTime() > new Date().getTime(),
      }
    }
    return null;
  }
}
