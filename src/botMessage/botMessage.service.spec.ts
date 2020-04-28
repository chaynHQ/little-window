import { Test, TestingModule } from '@nestjs/testing';
import { BotMessageService } from '../botMessage/botMessage.service'
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { UserMessageDto } from '../userMessage/userMessage.dto';
import { ConversationService } from '../conversation/conversation.service';
import { StoryblokService } from './storyblok.service';
import { repositoryMockFactory } from '../spec/factories/repository';
import { Conversation } from '../conversation/conversation.entity';
import { singleStoryblokResponse } from '../spec/data/singleStoryblokResponse'

jest.mock("../botMessage/storyblok.service");


describe('BotMessageService', () => {
  let botMessageService: BotMessageService;
  let storyblokService: StoryblokService;
  let userMessageDto: UserMessageDto =  {
    speech: 'Something Something',
    conversationId: '123456789'
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        BotMessageService,
        ConversationService,
        StoryblokService,
        {
          provide: getRepositoryToken(Conversation),
          useFactory: repositoryMockFactory
        },
      ],
    }).compile();

    botMessageService = app.get<BotMessageService>(BotMessageService);
    storyblokService = app.get<StoryblokService>(StoryblokService)
  });

  describe('getBotResponse', () => {
      test('should return an array', () => {
        jest.spyOn(storyblokService, "getBotResponsesBySlug").mockResolvedValue([singleStoryblokResponse]);

        return botMessageService.getBotResponse(userMessageDto).then(data => {
           expect(Array.isArray(data)).toBe(true);
        });
      });
    });

  describe('formatBotResponse', () => {
    test('should return an array of length one when it only recieves a response', () => {
        expect(botMessageService.formatBotResponse(singleStoryblokResponse, [], [], '1234')).toHaveLength(1);
    });

    test('should return an array of length equal to the length of all three arrays', () => {

      const prefixMessages = [
        singleStoryblokResponse,
        singleStoryblokResponse
      ]

      const suffixMessages = [
        singleStoryblokResponse,
        singleStoryblokResponse,
        singleStoryblokResponse
      ]

      expect(botMessageService.formatBotResponse(singleStoryblokResponse, prefixMessages, suffixMessages, '1234')).toHaveLength(1 + prefixMessages.length + suffixMessages.length);

    });

    test('should return a message if no response recieved', () => {

      expect(botMessageService.formatBotResponse(null, [], [], '1234')).toHaveLength(1);

    });
  });

});
