

import { PartialType } from '@nestjs/mapped-types';


export class CreateUserDto {
    name?: string;
    sex?: number;
    mobile?: string;
    password: string;
    email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}


export class ActivationVipDto {
    code: string;
    email: string;
}
