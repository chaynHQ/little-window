import { Injectable } from '@nestjs/common';
import { RollbarLogger } from 'nestjs-rollbar';

@Injectable()
export class RollbarLoggerService {
  constructor(
    private readonly rollbarLogger: RollbarLogger,
  ) {}

  error(data, name): void{
    if (process.env.NODE_ENV === 'production') {
      this.rollbarLogger.error(data, name)
    }
  }

}
