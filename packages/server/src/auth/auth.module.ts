import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from '@/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { jwtConstants } from '@/common/configs/constants';
import { EmailService } from '@/common/services/email.service';
import { SubscriptionModule } from '@/subscription/subscription.module';

@Module({
  imports: [
    UserModule,
    SubscriptionModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    EmailService
  ],
  exports: [AuthService],
})
export class AuthModule {}
