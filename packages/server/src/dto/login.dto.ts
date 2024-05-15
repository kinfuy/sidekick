import { IsString } from 'class-validator';
export class LoginDto {
    @IsString()
    email: string;
    @IsString()
    password: string;
}

export class RegisterDto {
    @IsString()
    userName: string;
    @IsString()
    email: string;
    @IsString()
    password: string;
    @IsString()
    verifyCode:string;
}

export class VerifyCodeDto {
    @IsString()
    email: string;
}
