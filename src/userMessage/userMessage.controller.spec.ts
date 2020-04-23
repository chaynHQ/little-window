import { Test, TestingModule } from '@nestjs/testing';
import { UserMessageController } from './userMessage.controller';
import { UserMessageService }from './userMessage.service';

describe('UserMessageController', () => {
  let userMessageController: UserMessageController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
        controllers: [UserMessageController],
        providers: [UserMessageService],
        imports: [],
        exports: [UserMessageService]
    }).compile();

    userMessageController = app.get<UserMessageController>(UserMessageController);
  });

  describe('root', () => {
    it('should return "Hello"', () => {
      expect(userMessageController.userMessage()).toBe('Hello');
    });
  });
});
