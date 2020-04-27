import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ConversationController } from './conversation.controller';
import { ConversationService }from './conversation.service';
import { Conversation } from './conversation.entity';
import { UserMessageModule } from '../userMessage/userMessage.module';
import { BotMessageService } from '../botMessage/botMessage.service';
import { StoryblokService } from '../botMessage/storyblok.service';
import { repositoryMockFactory } from '../spec/factories/repository';
import { singleStoryblokResponse } from '../spec/data/singleStoryblokResponse'

jest.mock("../botMessage/storyblok.service");

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
          useFactory: repositoryMockFactory
        },
        BotMessageService,
        StoryblokService
      ],
    }).compile();


    conversationController = app.get<ConversationController>(ConversationController);
    storyblokService = app.get<StoryblokService>(StoryblokService)
  });

  describe('new', () => {
      test('should return Conversation Opening Object', () => {
        jest.spyOn(storyblokService, "getBotResponsesBySlug").mockResolvedValue([singleStoryblokResponse]);

        return conversationController.newConversation().then(data => {
          expect(data).toContainEqual(
            expect.objectContaining({ "storyblokId": "5b14ea35-3a29-493e-a10d-1ba7bd10c6ca"})
          )
        });

      });
    });
});
