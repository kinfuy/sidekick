import { Injectable } from '@nestjs/common';
import { ActivationVipDto, CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionService } from '../subscription/subscription.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  getSubscription(id: string) {
    return this.subscriptionService.getSubscription(id);
  }

  async activationVip(activationVipDto: ActivationVipDto) {
    const res = await this.subscriptionService.createByCode({
      code: activationVipDto.code,
      email: activationVipDto.email,
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
