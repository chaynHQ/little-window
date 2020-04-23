import { Module } from '@nestjs/common';
import { UserMessageController } from './userMessage.controller';
import { UserMessageService }from './userMessage.service';
import { BotMessageModule } from '../botMessage/botMessage.module'

@Module({
  controllers: [UserMessageController],
  providers: [UserMessageService],
  imports: [BotMessageModule],
  exports: []
})

export class UserMessageModule {}
