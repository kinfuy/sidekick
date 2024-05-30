import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { responseCode } from '../configs/constants';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const successResponse = {
          message: '请求成功',
          code: responseCode.SUCCESS,
          data,
        };
        return successResponse;
      }),
    );
  }
}
