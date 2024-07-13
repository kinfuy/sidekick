import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { map, Observable, of } from 'rxjs';
  
  @Injectable()
  export class NoTransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
          map((response) => {
             if(response) response.__noTransform__ = true
             return response
          }),
        );
    }
  }
  