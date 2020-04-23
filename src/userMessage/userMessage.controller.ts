import { Controller, Post, Body } from '@nestjs/common';
import { BotMessageService } from '../botMessage/botMessage.service'
import { UserMessageDto } from './userMessage.dto'

@Controller('userMessage')
export class UserMessageController {
  constructor(private botMessageService: BotMessageService) {}

  @Post()
  userMessage(@Body() userMessageDto: UserMessageDto): string {
    // Do userMessage setup pieces

    // Get bot message
    console.log(userMessageDto)
    console.log(this.botMessageService.getBotResponse(userMessageDto))
    // Save usermessage
    // return it
    return 'Hello'
  }
}
