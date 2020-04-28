import { Module, forwardRef } from '@nestjs/common';
import { BotMessageService } from './botMessage.service';
import { StoryblokService } from './storyblok.service';
import { ConversationModule } from '../conversation/conversation.module';

@Module({
  providers: [BotMessageService, StoryblokService],
  imports: [forwardRef(() => ConversationModule)],
  exports: [BotMessageService, StoryblokService],
})
export class BotMessageModule {}
