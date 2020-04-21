require('dotenv').config();
import { Module } from '@nestjs/common';
import { UserMessageController } from './userMessage/userMessage.controller';
import { ConversationController } from './conversation/conversation.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [UserMessageController, ConversationController],
  providers: [AppService],
})
export class AppModule {}
