import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { RollbarLogger } from 'nestjs-rollbar';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
        private readonly rollbarLogger: RollbarLogger,
  ) {}

  async save(data, sender): Promise<string> {
    const message = new Message();
    message.message = data.speech;
    message.conversation_ = data.conversationId;
    message.previousmessage_ = data.previousMessageId;
    message.sender = sender;
    message['storyblok_id'] = data.storyblokId;

    return await this.messageRepository.save(message).then(message => {
      return message.id;
    }).catch(error => {
      this.rollbarLogger.error(error, 'Save Message')
      return null
    });
  }

  async getByConversationId(value: string): Promise<Array<object>> {
    const messages = await this.messageRepository.find({
      where: { "conversation_": value },
    }).catch(error => {
      this.rollbarLogger.error(error, 'Find Message')
      return null
    });

    return messages;
  }
}
