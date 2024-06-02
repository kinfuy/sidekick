import { HttpException } from "@nestjs/common";
import { responseCode } from "../configs/constants";

export class UserException extends HttpException {
    constructor(errmsg: string,errcode?: string) {
      super({ errcode: errcode || responseCode.FAIL, errmsg }, 200);
    }
  }