import { Controller, Post, Body, Ip } from '@nestjs/common';
import { BotMessageService } from '../botMessage/botMessage.service';
import { UserMessageDto } from './userMessage.dto';
import { ConversationService } from '../conversation/conversation.service';
import { UserMessageService } from './userMessage.service';
import { MessageService } from '../message/message.service';
import { BotMessageDto } from '../botMessage/botMessage.dto';

@Controller('userMessage')
export class UserMessageController {
  constructor(
    private conversationService: ConversationService,
    private userMessageService: UserMessageService,
    private botMessageService: BotMessageService,
    private messageService: MessageService,
  ) {}

  @Post()
  async userMessage(
    @Ip() userIpAddress,
    @Body() userMessageDto: UserMessageDto,
  ): Promise<Array<BotMessageDto>> {
    const conversationId: string = userMessageDto.conversationId;
    const previousMessageStoryblokId: string =
      userMessageDto.previousMessageStoryblokId;
    const userResponse: string = userMessageDto.speech;

    // If setup, setup the conversation
    const conversationStage: string = await this.conversationService.get(
      conversationId,
      'stage',
    );
    if (conversationStage === 'setup') {
      await this.userMessageService.setupConversation(
        userResponse,
        conversationId,
        previousMessageStoryblokId,
        userIpAddress
      );
    }

    // Save user Message
    const userMessageId = await this.messageService.save(
      userMessageDto,
      'user',
    );

    // Get bot Message & Save it
    return this.botMessageService
      .getBotResponse(userMessageDto)
      .then(async (botResponses: Array<BotMessageDto>) => {
        const formattedResponses = [];
        for (const [index, response] of botResponses.entries()) {
          if (index === 0) {
            response.previousMessageId = userMessageId;
          } else {
            response.previousMessageId = botResponses[index - 1].messageId;
          }

          response.messageId = await this.messageService.save(response, 'bot');

          formattedResponses.push(response);
        }

        return formattedResponses;
      });
  }
}
