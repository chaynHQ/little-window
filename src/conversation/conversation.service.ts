import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Conversation } from './conversation.entity';

@Injectable()
export class ConversationService {
  constructor(private connection: Connection) {}

  async create() {
    //// TODO:
    const conversation = new Conversation();
    conversation.stage = "setup";
    await this.connection.manager.save(conversation).then(conversation => {
                console.log("Conversation has been saved. Conversation id is", conversation.id);
            });;
  }

}
