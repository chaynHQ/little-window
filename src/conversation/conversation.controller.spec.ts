import { Test, TestingModule } from '@nestjs/testing';
import { ConversationController } from './conversation.controller';
import { AppService } from '../app.service';

describe('ConversationController', () => {
  let conversationController: ConversationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ConversationController],
      providers: [AppService],
    }).compile();

    conversationController = app.get<ConversationController>(ConversationController);
  });

  describe('new', () => {
    it('should return "Hello World!"', () => {
      expect(conversationController.newConversation()).toBe('Hello World!');
    });
  });
});
