import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationController } from './conversation.controller';
import { ConversationService }from './conversation.service';
import { Conversation } from './conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation])],
  controllers: [ConversationController],
  providers: [ConversationService],
})

export class ConversationModule {}
