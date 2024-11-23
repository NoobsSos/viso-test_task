import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log('Request:', {
      method: request.method,
      url: request.url,
      body: request.body,
    });

    return next.handle().pipe(
      tap((response) => console.log('Response:', response)),
    );
  }
}
