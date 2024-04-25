import { Controller, Get } from '@nestjs/common';
import { EmailService } from './service/email.service';

@Controller('email')
export class AppController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  async getHello() {
    debugger
    return this.emailService.sendEmail({
      to:'kinfuy@outlook.com',
      subject:"TEST",
      text:"我是一份测试邮件"
    })
  }
}
