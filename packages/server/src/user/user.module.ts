import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SubscriptionService } from '../subscription/subscription.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,SubscriptionService],
  exports: [ TypeOrmModule.forFeature([User])],
})
export class UserModule {}
