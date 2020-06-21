import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.entity';
import { BotMessageService } from '../botMessage/botMessage.service';
import { StoryblokService } from '../botMessage/storyblok.service';
import { DialogFlowService } from '../botMessage/dialogFlow.service';
import { conversationRepositoryMockFactory } from '../spec/factories/conversationRepository';
import { messageRepositoryMockFactory } from '../spec/factories/messageRepository';
import { singleStoryblokResponse } from '../spec/data/singleStoryblokResponse';
import { MessageService } from '../message/message.service';
import { Message } from '../message/message.entity';
import { RollbarLogger } from 'nestjs-rollbar';
import { rollbarMockFactory } from '../spec/factories/rollbar';
import { HttpModule } from '@nestjs/common';

jest.mock('../botMessage/storyblok.service');

describe('ConversationController', () => {
  let conversationController: ConversationController;
  let storyblokService: StoryblokService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ConversationController],
      providers: [
        ConversationService,
        {
          provide: getRepositoryToken(Conversation),
          useFactory: conversationRepositoryMockFactory,
        },
        BotMessageService,
        StoryblokService,
        MessageService,
        DialogFlowService,
        {
          provide: getRepositoryToken(Message),
          useFactory: messageRepositoryMockFactory,
        },
        {
          provide: RollbarLogger,
          useFactory: rollbarMockFactory,
        },
      ],
      imports: [
        HttpModule
      ]
    }).compile();

    conversationController = app.get<ConversationController>(
      ConversationController,
    );
    storyblokService = app.get<StoryblokService>(StoryblokService);
  });

  describe('new', () => {
    test('should return Conversation Opening Object', () => {
      jest
        .spyOn(storyblokService, 'getBotResponsesBySlug')
        .mockResolvedValue([singleStoryblokResponse]);

      return conversationController.newConversation().then(data => {
        expect(data).toEqual({
            conversationId: '123456789'
        });
      });
    });
  });
});
