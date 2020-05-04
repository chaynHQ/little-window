import { Test, TestingModule } from '@nestjs/testing';
import { UserMessageController } from './userMessage.controller';
import { UserMessageService } from './userMessage.service';
import { BotMessageService } from '../botMessage/botMessage.service';
import { UserMessageDto } from './userMessage.dto';
import { ConversationService } from '../conversation/conversation.service';
import { StoryblokService } from '../botMessage/storyblok.service';
import { MessageService } from '../message/message.service';
import { DialogFlowService } from '../botMessage/dialogFlow.service'
import { Conversation } from '../conversation/conversation.entity';
import { Message } from '../message/message.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { conversationRepositoryMockFactory } from '../spec/factories/conversationRepository';
import { messageRepositoryMockFactory } from '../spec/factories/messageRepository';
import { RollbarLogger } from 'nestjs-rollbar';
import { rollbarMockFactory } from '../spec/factories/rollbar';


describe('UserMessageController', () => {
  let userMessageController: UserMessageController;
  const userMessageDto: UserMessageDto = {
    speech: 'Something Something',
    conversationId: '123456789',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserMessageController],
      providers: [
        UserMessageService,
        BotMessageService,
        ConversationService,
        StoryblokService,
        MessageService,
        DialogFlowService,
        {
          provide: getRepositoryToken(Conversation),
          useFactory: conversationRepositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Message),
          useFactory: messageRepositoryMockFactory,
        },
        {
          provide: RollbarLogger,
          useFactory:rollbarMockFactory
        }
      ],
    }).compile();

    userMessageController = app.get<UserMessageController>(
      UserMessageController,
    );
  });

  describe('root', () => {
    it('should return array', () => {
      return userMessageController.userMessage(userMessageDto).then(data => {
        expect(Array.isArray(data)).toBe(true);
      });
    });
  });
});
