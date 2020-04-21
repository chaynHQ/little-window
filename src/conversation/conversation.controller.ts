import { Controller, Post } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly appService: AppService) {}

  @Post('new')
  newConversation(): string {
    // Save Conversation
    // DB provider

    // Return Bot message
    // Bot Message Provider
    return this.appService.getHello();
  }
}
