import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { messageRepositoryMockFactory } from '../spec/factories/messageRepository';
import { Message } from './message.entity'

describe('MessageService', () => {

  let messageService: MessageService;
  let mockMessage: {};

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(Message),
          useFactory: messageRepositoryMockFactory,
        },
      ],
    }).compile();

    mockMessage = {speech: 'foo', conversation_: '12345', previousmessage_: '12345', 'storyblok_id': '1234'}
    messageService = app.get<MessageService>(MessageService);
  });

  describe('save', () => {
    test('should return an array', () => {

      return messageService.save(mockMessage, 'bot').then(data => {
        expect(data).toBe('123456789');
      });
    });
  });

  describe('get', () => {
    test('should return an array', () => {

      return messageService.get('conversation_id', '12345').then(data => {
        console.log(data)
        expect(Array.isArray(data)).toBe(true);
      });
    });
  });

});
