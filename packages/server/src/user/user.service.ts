import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as blueimpMd5 from 'blueimp-md5';
import { RegisterDto } from '@/auth/auto.dto';
import { isEmpty } from 'class-validator';
import { UserException } from '@/common/exceptions/custom.exception';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  async register(params: RegisterDto, notFoundCreate = false) {
    const { email, password } = params;
    const exists  = await this.user.findOne({ where: { email: email } });
    if (!isEmpty(exists) && !notFoundCreate) {
      throw new UserException('该邮箱已被注册');
    }

    const user = exists ?? new User();

    user.email = email
    user.updateTime = new Date();
    user.password = blueimpMd5(`${email}${password}`);

    this.user.save(user);
    return user;
  }


  findOne(email: string) {
    return this.user.createQueryBuilder('user').addSelect('user.password').where('user.email = :email', { email }).getOne();
  }

  

  async verifyEmail(params: RegisterDto) {
    return this.register(params, true);
  }
}
