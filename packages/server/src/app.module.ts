import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionModule } from './subscription/subscription.module';
import { AuthModule } from './auth/auth.module';
import { envConfig } from '@/common/configs/env';
import { DataModule } from './data/data.module';

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
    AuthModule,
    UserModule,
    SubscriptionModule,
    DataModule,
   
  ],
})
export class AppModule {}
