import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import CustomExceptionResponse from '@/common/interfaces/CustomExceptionResponseBody';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<CustomExceptionResponse>>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const messages =
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse &&
      Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message
        : [exception.message];

    response.status(status).json({
      statusCode: status,
      messages,
      timestamp: new Date().toISOString(),
    });
  }
}
