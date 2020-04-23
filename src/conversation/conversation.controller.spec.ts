import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationController } from './conversation.controller';
import { ConversationService }from './conversation.service';
import { Conversation } from './conversation.entity';
import { UserMessageModule } from '../userMessage/userMessage.module';

describe('ConversationController', () => {
  let conversationController: ConversationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ConversationController],
      providers: [ConversationService,
        {
          provide: getRepositoryToken(Conversation),
          useFactory: repositoryMockFactory
        }
      ],
      imports: [
        UserMessageModule
      ],
    }).compile();

    conversationController = app.get<ConversationController>(ConversationController);
  });

  describe('new', () => {
    it('should return "Hello"', () => {
      expect(conversationController.newConversation()).toBe('Hello');
    });
  });
});

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  save: jest.fn(() => Promise.resolve({id:'123456789'}))
}));
export type MockType<T> = {
 [P in keyof T]: jest.Mock<{}>;
};
