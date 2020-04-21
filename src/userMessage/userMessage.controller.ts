import { Controller, Post } from '@nestjs/common';
import { UserMessageService } from './userMessage.service'

@Controller('userMessage')
export class UserMessageController {
  constructor(private userMessageService: UserMessageService) {}

  @Post()
  userMessage(): string {
    console.log(this.userMessageService.getBotResponse())
    return 'User Message Recieved'
  }
}
