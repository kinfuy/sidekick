import { Injectable } from '@nestjs/common';
import { ActivationVipDto, CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionService } from '../subscription/subscription.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userModel: Repository<User>,
  ) {}


  create(createUserDto: CreateUserDto) {
    return this.userModel.save(createUserDto);
  }

  save(user: User) {
    return this.userModel.save(user);
  }

  createQueryBuilder(name: string) {
    return this.userModel.createQueryBuilder(name);
  }

  findAll() {
    return this.userModel.find();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email: email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userModel.update(id, { isDelete: true });
  }
}
