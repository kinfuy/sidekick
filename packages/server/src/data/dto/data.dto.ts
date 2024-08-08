import { IsNotEmpty } from "class-validator";

export class DataDto  {
    @IsNotEmpty({ message: 'type 不能为空' })
    type: String;
    data: any
}
