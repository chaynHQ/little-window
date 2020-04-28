import { Test, TestingModule } from '@nestjs/testing';
import { UserMessageController } from './userMessage.controller';
import { UserMessageService }from './userMessage.service';
import { BotMessageService}  from '../botMessage/botMessage.service';
import { UserMessageDto } from './userMessage.dto';
import { ConversationService } from '../conversation/conversation.service';
import { StoryblokService } from '../botMessage/storyblok.service';
import { MessageService } from '../message/message.service';
import { Conversation } from '../conversation/conversation.entity';
import { Message} from '../message/message.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserMessageController', () => {
  let userMessageController: UserMessageController;
  let userMessageDto: UserMessageDto =  {
    speech: 'Something Something',
    conversationId: '123456789'
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
        controllers: [UserMessageController],
        providers: [UserMessageService,
          BotMessageService,
          ConversationService,
          StoryblokService,
          MessageService,
          {
            provide: getRepositoryToken(Conversation),
            useFactory: repositoryMockFactory
          },
          {
            provide: getRepositoryToken(Message),
            useFactory: repositoryMockFactory
          },
        ]
    }).compile();

    userMessageController = app.get<UserMessageController>(UserMessageController);
  });

  describe('root', () => {
    it('should return array', () => {
      return userMessageController.userMessage(userMessageDto).then(data => {
        expect(Array.isArray(data)).toBe(true);
      });
    });
  });
});

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  save: jest.fn(() => Promise.resolve({id:'123456789'})),
  findOne: jest.fn(() => Promise.resolve({
    id: '6595164b-8546-4193-8836-64294221a4e0',
    gdpr: null,
    language: null,
    stage: 'setup',
    time_created: '2020-04-27T09:05:13.834Z'
  }))
}));

export type MockType<T> = {
 [P in keyof T]: jest.Mock<{}>;
};
