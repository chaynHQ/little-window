import { Controller, Post } from '@nestjs/common';
import { ConversationService } from './conversation.service'
import { UserMessageService } from '../userMessage/userMessage.service'

@Controller('conversation')
export class ConversationController {
  constructor(
    private conversationService: ConversationService,
    private userMessageService: UserMessageService
  ) {}

  @Post('new')
  newConversation(): string {
    this.conversationService.create();
    // Return Bot message
    this.userMessageService.getBotResponse();
    // Bot Message Provider
    return 'Hello';
  }
}
