import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DeleteInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const http = context.switchToHttp();
        const response = http.getResponse();
        const request = http.getRequest();

        if (request.method === 'DELETE') {
          response.status(204);
        }

        return data;
      }),
    );
  }
}
