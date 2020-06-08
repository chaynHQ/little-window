import { Controller, Post, Inject, forwardRef } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationDto } from './conversation.dto';

@Controller('conversation')
export class ConversationController {
  constructor(
    private conversationService: ConversationService,
  ) {}

  @Post('new')
  async newConversation(): Promise<ConversationDto> {
    const conversationId = await this.conversationService.create();
    return {
      conversationId: conversationId,
    };
  }
}
