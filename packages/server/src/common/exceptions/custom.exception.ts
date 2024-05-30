import { HttpException } from "@nestjs/common";

export class UserException extends HttpException {
    constructor(errcode: string, errmsg: string) {
      super({ errcode, errmsg }, 200);
    }
  }