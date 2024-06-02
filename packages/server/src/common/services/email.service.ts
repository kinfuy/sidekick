import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envConfig } from '@/common/configs/env';
interface MailInfo {
  // 接收方邮箱
  to: string;
  // 标题
  subject: string;
  // 文本
  text?: string;
  // 富文本，如果文本和富文本同时设置，富文本生效。
  html?: string;
}
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private mailConfig = {
    host: envConfig.email.host,
    port: envConfig.email.port,
    secure: true,
    auth: {
      user: envConfig.email.auth.user,
      pass: envConfig.email.auth.pass,
    },
  };
  constructor() {
    this.transporter = nodemailer.createTransport(this.mailConfig);
  }

  async sendEmail(mailInfo: MailInfo) {
    const info = await this.transporter.sendMail({
      from: this.mailConfig.auth.user, //发送方邮箱
      ...mailInfo,
    });

    return info;
  }
  

  async sendCode(email: string,code:number) {
    await this.sendEmail({
      to: email,
      subject: '【DevTester】注册验证码',
      html: emailTemplate(code),
    });
    return true
  }
}


const emailTemplate = (code:number)=>{
  return `<!doctype html>
  <html lang="zh-CN">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>DevTester 欢迎您！</title>
      <style>
        body {
          font-family: sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
        }
  
        .container {
          width: 600px;
          margin: 40px auto;
          padding: 30px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
  
        .header {
          text-align: left;
          font-size: 24px;
          margin-bottom: 20px;
          color: #333;
        }
  
        .content {
          line-height: 1.5;
          color: #666;
        }
  
        .code {
          font-size: 20px;
          font-weight: bold;
          color: #4285f4; /* 蓝色验证码 */
          display: block;
          margin-bottom: 10px;
        }
  
        .footer {
          text-align: left; /* 左对齐 */
          margin-top: 20px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">DevTester 欢迎您！</div>
  
        <div class="content">
          <p>感谢您选择 DevTester！</p>
  
          <p>为了保障您的账户安全，请使用以下验证码完成注册：</p>
  
          <p class="code">${code}</p>
  
          <p>请妥善保管您的验证码，切勿泄露给他人。</p>
  
          <p>如果您并未申请注册 DevTester 账户，请忽略此邮件。</p>
  
          <p>
            我们期待您加入 DevTester
            大家庭，并留下宝贵的使用反馈。如果您在使用过程中遇到任何问题，请随时联系我们的客服团队，我们将竭诚为您服务。
          </p>
        </div>
  
        <div class="footer">
          <p>祝您使用愉快！</p>
          <p>DevTester 团队</p>
        </div>
      </div>
    </body>
  </html>
  `
}