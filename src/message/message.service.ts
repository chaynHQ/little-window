import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>
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
    });
  }

  async get(
    value: string,
    column: string,
  ): Promise<Array<object>> {
    const messages = await this.messageRepository.find({ where: { column: value } });

    return messages;
  }
}
