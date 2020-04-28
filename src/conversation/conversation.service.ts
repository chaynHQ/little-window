import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './conversation.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>) {}

  async create(): Promise<string> {
    const conversation = new Conversation();
    conversation.stage = "setup";

    return await this.conversationRepository.save(conversation).then(conversation => {
                return conversation.id
            });
  }

  async get(conversationId: string): Promise<{language, stage}>;
  async get(conversationId: string, column: string): Promise<string>;

  async get(conversationId: string, column?: string): Promise<string |{language, stage}> {
    const conversation = await this.conversationRepository.findOne(conversationId);

    if (!conversation){
      throw "Cannot find conversation with that id"
    }

    return column ? conversation[column] : conversation;
  }

  async update (column, value, conversationId):Promise<object> {
    const conversation = new Conversation();
    conversation[column] = value;
    conversation.id = conversationId

    return await this.conversationRepository.save(conversation)
  }

}
