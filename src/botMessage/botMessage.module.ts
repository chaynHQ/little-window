import { Module, forwardRef } from '@nestjs/common';
import { BotMessageService } from './botMessage.service';
import { StoryblokService } from './storyblok.service';
import { ConversationModule } from '../conversation/conversation.module';
import { MessageModule } from '../message/message.module';
import { DialogFlowService } from './dialogFlow.service';

@Module({
  providers: [BotMessageService, StoryblokService, DialogFlowService],
  imports: [forwardRef(() => ConversationModule), MessageModule],
  exports: [BotMessageService, StoryblokService, DialogFlowService],
})
export class BotMessageModule {}
