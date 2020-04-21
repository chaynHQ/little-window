import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, Connection } from 'typeorm';
import { Conversation } from './conversation.entity';

@Injectable()
export class ConversationService {
  constructor(private connection: Connection) {}

  async create() {
    //// TODO:
    console.log("START HERE")
    await this.connection.transaction(async manager => {
      await manager.save('sdfs');
    });
  }

}
