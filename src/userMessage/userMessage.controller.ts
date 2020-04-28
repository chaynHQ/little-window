import { Controller, Post, Body} from '@nestjs/common';
import { BotMessageService } from '../botMessage/botMessage.service'
import { UserMessageDto } from './userMessage.dto'
import { ConversationService } from '../conversation/conversation.service';
import { UserMessageService } from './userMessage.service'
import { MessageService } from '../message/message.service';

@Controller('userMessage')
export class UserMessageController {
  constructor(
    private conversationService: ConversationService,
    private userMessageService: UserMessageService,
    private botMessageService: BotMessageService,
    private messageService: MessageService
  ) {}


  @Post()
  async userMessage(@Body() userMessageDto:UserMessageDto){
    const conversationId: string = userMessageDto.conversationId;
    const previousMessageStoryblokId: string = userMessageDto.previousMessageStoryblokId;
    const userResponse: string = userMessageDto.speech;

    // If setup, setup the conversation
    const conversationStage = await this.conversationService.get(conversationId, 'stage');

    if (conversationStage === 'setup'){
      await this.userMessageService.setupConversation(userResponse, conversationId, previousMessageStoryblokId)
    }
    // Save user Message
    await this.messageService.save(userMessageDto, 'user');

    console.log("START HERE")
    console.log("WITH TESTS")
    // Get bot Message & Save it
    // this.botMessageService.getBotResponse(userMessageDto).then(async (botResponses) => {
    //   const formattedResponses = [];
    //   for (const [index, response] of botResponses.entries()) {
    //     if (index === 0) {
    //       response.previousMessageId = userMessageId;
    //     } else {
    //       response.previousMessageId = botResponses[index - 1].messageId;
    //     }
    //     response.messageId = await saveMessage(response, 'bot');
    //
    //     formattedResponses.push(response);
    //   }
    //   return formattedResponses;
    // });
    //
    // // Save usermessage
    //
    // // return it
    return 'Hello'
  }
}
