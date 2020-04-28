import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private conversationRepository: Repository<Message>) {}

  async save(data, sender) {
    const message = new Message();
    message.message = data.speech
    message.conversation_ = data.conversationId
    message.previousmessage_ = data.previousMessageId
    message.sender = sender

    return await this.conversationRepository.save(message).then(message => {
            });
  }

}
