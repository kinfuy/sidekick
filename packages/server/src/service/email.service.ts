import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envConfig } from '../config';
import { responseCode } from 'src/Config/const';

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
    secure: false,
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
    this.sendEmail({
      to: email,
      subject: '【sidekick】注册验证码',
      html: emailTemplate(code),
    });
  }
}


const emailTemplate = (code:number)=>{
  return `	<!DOCTYPE html>  
  <html lang="zh">  
  <head>  
      <meta charset="UTF-8">  
      <meta name="viewport" content="width=device-width, initial-scale=1.0">  
      <title>验证码通知</title>  
      <style>  
          body {  
              font-family: Arial, sans-serif;  
              background-color: #f0f0f0;  
              margin: 0;  
              padding: 0;  
          }  
          .container {  
              max-width: 600px;  
              margin: 0 auto;  
              background-color: #fff;  
              padding: 20px;  
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);  
              margin-top: 20px;  
              margin-bottom: 20px;  
          }  
          h1 {  
              text-align: center;  
          }  
          p {  
              margin-top: 10px;  
              margin-bottom: 10px;  
          }  
      </style>  
  </head>  
  <body>  
      <div class="container">  
          <h2>尊敬的用户：</h2>  
          <p>感谢您选择Sidekick插件。</p>
          <p>您的验证码是：<span style="font-weight: bold;font-size: 20px; color: #3498db;">${code}</span>，请妥善保管。</p>  
          <p>若非本人操作，请忽略此邮件。</p>
          <p>期待您的使用与反馈，如有任何问题，请随时联系我们。</p>  
          <p>祝您使用愉快！ Sidekick插件团队</p>
      </div>  
  </body>  
  </html>`
}