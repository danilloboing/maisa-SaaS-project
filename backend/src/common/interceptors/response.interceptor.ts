import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly httpService: HttpService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((res) => ({
        success: true,
        path: request.url,
        statusCode: 200,
        result: res,
      })),
      catchError((err) => {
        const exception = this.handleException(err, context);
        return throwError(() => exception);
      }),
    );
  }

  private handleException(exception: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage = exception.message || 'Unknown error';
    const errorResponse = exception.getResponse ? exception.getResponse() : {};

    return new HttpException(
      {
        success: false,
        path: request.url,
        message: errorMessage,
        response: errorResponse,
      },
      status,
    );
  }
}
