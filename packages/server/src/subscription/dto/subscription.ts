import { PartialType } from '@nestjs/mapped-types';


export class CreateSubscriptionDto {
    code: string
    userId: number
}

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {}
