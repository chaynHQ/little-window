import { Module, HttpModule } from '@nestjs/common';

import { UserMessageController } from './userMessage.controller';
import { UserMessageService } from './userMessage.service';

import { ConversationModule } from '../conversation/conversation.module';
import { BotMessageModule } from '../botMessage/botMessage.module';
import { MessageModule } from '../message/message.module';

@Module({
  controllers: [UserMessageController],
  providers: [UserMessageService],
  imports: [ConversationModule, BotMessageModule, MessageModule, HttpModule],
})
export class UserMessageModule {}
