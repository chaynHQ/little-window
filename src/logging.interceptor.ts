import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger: Logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();

    this.logger.log({
      originalUrl: req.originalUrl,
      method: req.method,
      body: req.body,
    });

    return next
      .handle()
      .pipe(tap(data => this.logger.log({ statusCode, data })));
  }
}
