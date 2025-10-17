import {
  type ExceptionFilter,
  type ArgumentsHost,
  Catch,
  Logger,
  HttpException,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const response = context.getResponse() as Response;

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Interval server Error';

    this.logger.error(message);

    response.status(status).json({
      status,
      message,
      timestamp: new Date().toISOString(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      path: context.getRequest().url,
    });
  }
}
