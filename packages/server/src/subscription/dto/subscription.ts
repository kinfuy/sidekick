import { PartialType } from '@nestjs/mapped-types';


export class CreateSubscriptionDto {
    code: string
    email: string
}

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {}


export class CreateActivationDto {
    type: number
}