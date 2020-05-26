import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.entity';
import { BotMessageModule } from '../botMessage/botMessage.module';
import { RollbarLoggerService } from '../common/rollbarLogger.service'

@Module({
  controllers: [ConversationController],
  providers: [ConversationService, RollbarLoggerService],
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    forwardRef(() => BotMessageModule),
  ],
  exports: [ConversationService],
})
export class ConversationModule {}
