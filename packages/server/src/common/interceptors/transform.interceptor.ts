import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { responseCode } from '../configs/constants';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        let msg = '成功';
        let rst = null;
        if(!response) {
          return {
            message: '成功',
            code: responseCode.SUCCESS,
          }
        }
        const { message, data } = response;
        if (message) {
          msg = message;
          rst = data || {};
        } else {
          rst = response;
        }
        const successResponse: any = {
          message: msg,
          code: responseCode.SUCCESS,
        };
        if (rst) {
          successResponse.data = rst;
        }
        return successResponse;
      }),
    );
  }
}
