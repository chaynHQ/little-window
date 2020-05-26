import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { RollbarLoggerService } from '../common/rollbarLogger.service'

@Module({
  providers: [MessageService, RollbarLoggerService],
  imports: [TypeOrmModule.forFeature([Message])],
  exports: [MessageService],
})
export class MessageModule {}
