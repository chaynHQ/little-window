import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Conversation } from './conversation.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>) {}

  async create() {
    const conversation = new Conversation();
    conversation.stage = "setup";

    return await this.conversationRepository.save(conversation).then(conversation => {
                return conversation.id
            });;
  }

  async get(conversationId: string, column?: string) {
    const conversation = await this.conversationRepository.findOne(conversationId);
    return column ? conversation[column] : conversation;
  }

}
