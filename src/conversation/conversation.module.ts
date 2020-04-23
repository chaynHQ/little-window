import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationController } from './conversation.controller';
import { ConversationService }from './conversation.service';
import { Conversation } from './conversation.entity';
import { UserMessageModule } from '../userMessage/userMessage.module'

@Module({
  controllers: [ConversationController],
  providers: [ConversationService],
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    UserMessageModule
  ],
  exports: []
})

export class ConversationModule {}
