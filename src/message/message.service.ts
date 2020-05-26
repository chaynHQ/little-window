import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { RollbarLoggerService } from '../common/rollbarLogger.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private readonly rollbarLoggerService: RollbarLoggerService,
  ) {}

  async save(data, sender): Promise<string> {
    const message = new Message();
    message.message = data.speech;
    message.conversation_ = data.conversationId;
    message.previousmessage_ = data.previousMessageId;
    message.sender = sender;
    message['storyblok_id'] = data.storyblokId;

    return await this.messageRepository
      .save(message)
      .then(message => {
        return message.id;
      })
      .catch(error => {
        this.rollbarLoggerService.error(error, 'Save Message');
        return null;
      });
  }

  async getByConversationId(value: string): Promise<Array<object>> {
    const messages = await this.messageRepository
      .find({
        where: { conversation_: value },
      })
      .catch(error => {
        this.rollbarLoggerService.error(error, 'Find Message');
        return null;
      });

    return messages;
  }
}
