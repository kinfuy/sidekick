import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '@/common/interceptors/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局注册错误的过滤器(错误异常)

  app.use(
    session({
      secret: 'dev-tester',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 5, },
    }),
  );

  app.enableCors();

  await app.listen(9000);
}
bootstrap();
