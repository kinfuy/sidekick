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
        if (!response) return { message: '成功', code: responseCode.SUCCESS };
        const { message, data, __noTransform__ } = response;

        // 如果是__noTransform__ 则不进行转换
        if (__noTransform__) {
          delete response.__noTransform__;
          return response;
        };

        if (message) {
          return { message, data: data || {}, code: responseCode.SUCCESS };
        }

        return {
          message: '成功',
          data: response,
          code: responseCode.SUCCESS,
        };
      }),
    );
  }
}
