import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { responseCode } from '@/common/configs/constants';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象

    let errMessage = exception.message;
    let errCode = responseCode.FAIL;
    
    const rst:any = exception.getResponse()
    // 拦截class-validate错误信息
    try {
      const exceptionResponse = rst;
      if (Object.hasOwnProperty.call(exceptionResponse, 'message')) {
        errMessage = exceptionResponse.message;
      }
    } catch (e) {}

    // 处理自定义错误
    if(exception.name==='UserException'){
      errMessage = rst.errmsg
      errCode = rst.errcode
    }

    const errorResponse = {
      message: errMessage,
      code: responseCode.FAIL,
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(200);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
