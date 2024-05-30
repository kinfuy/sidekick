import { Injectable } from '@nestjs/common';
import { ActivationVipDto, CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as blueimpMd5 from 'blueimp-md5';
import { SubscriptionService } from '../subscription/subscription.service';
import { RegisterDto } from '@/auth/auto.dto';
import { isEmpty } from 'class-validator';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  async register(params: RegisterDto) {
    const { email, password } = params;
    const exists  = await this.user.findOne({ where: { email: email } });
    if (!isEmpty(exists)) return 

    const user = this.user.create()

    user.email = email
    user.updateTime = new Date();
    user.password = blueimpMd5(`${email}${password}`);

    this.user.save(user);
    return user;
  }

  findOne(email: string) {
    return this.user.findOne({ where: { email: email } });
  }
}
