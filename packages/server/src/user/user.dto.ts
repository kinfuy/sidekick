import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  Length,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @Length(3, 20, { message: '用户名长度必须在 5 到 20 个字符' })
  name: string;
  @IsNumber({ allowNaN: false }, { message: '性别必须是数字' })
  sex?: number;
  @IsPhoneNumber('CA', { message: '手机号格式不正确' })
  mobile?: string;
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @Length(6, 20, { message: '密码长度必须在 6 到 20 个字符' })
  password: string;
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class ActivationVipDto {
  @IsNotEmpty({ message: '激活码不能为空' })
  @IsString({ message: '激活码必须是字符串' })
  code: string;
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;
}





