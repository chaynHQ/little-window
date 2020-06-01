import { Module, forwardRef, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.entity';
import { BotMessageModule } from '../botMessage/botMessage.module';

@Module({
  controllers: [ConversationController],
  providers: [ConversationService],
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    forwardRef(() => BotMessageModule),
    HttpModule
  ],
  exports: [ConversationService],
})
export class ConversationModule {}
