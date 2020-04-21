import { Controller, Post } from '@nestjs/common';
import { ConversationService } from './conversation.service'

@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}


  @Post('new')
  newConversation(): string {
    // Save Conversation
    // DB provider
    this.conversationService.create();
    // Return Bot message
    // Bot Message Provider
    return 'Hello';
  }
}
