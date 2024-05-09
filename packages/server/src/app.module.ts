import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig } from './config';
import { EmailService } from './service/email.service';
import { LoginService } from './service/login.service';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionService } from './subscription/subscription.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envConfig.host,
      port: Number(envConfig.port),
      username: envConfig.username,
      password: envConfig.password,
      database: envConfig.database,
      // 开启打印生成sql语句
      logging: false,
      synchronize: true, //自动同步创建数据库表,具备一定的危险线，存在线上应用时尽量关闭
      retryDelay: 500,
      retryAttempts: 10,
      autoLoadEntities: true, //自动查找entity实体
    }),
    UserModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService, LoginService],
})
export class AppModule {}
