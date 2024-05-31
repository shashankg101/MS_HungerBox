import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class MenuExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      message: typeof exceptionResponse === 'string' ? exceptionResponse : 'Internal server error', // Use the exceptionResponse only if it's a string
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
