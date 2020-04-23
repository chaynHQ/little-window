import { Controller, Post, Inject, forwardRef } from '@nestjs/common';
import { ConversationService } from './conversation.service'
import { BotMessageService } from '../botMessage/botMessage.service'

@Controller('conversation')
export class ConversationController {
  constructor(
    private conversationService: ConversationService,
    @Inject(forwardRef(() => BotMessageService))
    private botMessageService: BotMessageService
  ) {}

  @Post('new')
  async newConversation() {
    const conversationId = await this.conversationService.create();
    // Return Bot message
    this.botMessageService.getBotResponse({conversationId: conversationId});
    // Bot Message Provider
    return 'Hello';
  }
}
