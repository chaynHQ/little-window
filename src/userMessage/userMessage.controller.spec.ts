import { Test, TestingModule } from '@nestjs/testing';
import { UserMessageController } from './userMessage.controller';
import { AppService } from '../app.service';

describe('UserMessageController', () => {
  let userMessageController: UserMessageController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserMessageController],
      providers: [AppService],
    }).compile();

    userMessageController = app.get<UserMessageController>(UserMessageController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userMessageController.getHello()).toBe('Hello World!');
    });
  });
});
