import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
export interface Response<T> {
  data: T;
}
@Injectable()
export class StatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('pass interceptor...');
    const now = Date.now();
    //handle이 없으면 status() 핸들러는 trigger
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
    // return next.handle().pipe(map((data) => ({ data })));
  }
}
