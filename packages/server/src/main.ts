import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import * as session from 'express-session';  

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局注册错误的过滤器(错误异常)

  app.use(  
    session({  
      secret: 'sidekick',
      resave: false, // 避免不必要的 session 更新  
      saveUninitialized: false, // 避免不必要的 session 创建  
      cookie: {  
        maxAge: 1000 * 60 * 60 * 24, // 设置 cookie 的有效期为一天  
      },  
    }),  
  ); 

  app.enableCors();


  await app.listen(9000);
}
bootstrap();
