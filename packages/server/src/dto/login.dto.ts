export class LoginDto {
    email: string;
    password: string;
}

export class RegisterDto {
    userName: string;
    email: string;
    password: string;
    verifyCode:string;
}

export class VerifyCodeDto {
    email: string;
}