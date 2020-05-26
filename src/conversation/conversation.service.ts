import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './conversation.entity';
import { RollbarLoggerService } from '../common/rollbarLogger.service';

@Injectable()
export class ConversationService {
  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    private readonly rollbarLoggerService: RollbarLoggerService,
  ) {}

  async create(): Promise<string> {
    const conversation = new Conversation();
    conversation.stage = 'setup';

    return await this.conversationRepository
      .save(conversation)
      .then(conversation => {
        return conversation.id;
      })
      .catch(error => {
        this.rollbarLoggerService.error(error, 'Save Conversation');
        return null;
      });
  }

  async get(conversationId: string): Promise<{ language; stage }>;
  async get(conversationId: string, column: string): Promise<string>;

  async get(
    conversationId: string,
    column?: string,
  ): Promise<string | { language; stage }> {
    const conversation = await this.conversationRepository
      .findOne(conversationId)
      .catch(error => this.rollbarLoggerService.error(error, 'Get Conversation'));

    if (!conversation) {
      this.rollbarLoggerService.error(
        {
          message: 'Cannot find a conversation with id: ' + conversationId,
          name: 'No ConversationId',
        },
        'Get Conversation',
      );
      throw new NotFoundException();
    }

    return column ? conversation[column] : conversation;
  }

  async update(column, value, conversationId): Promise<object> {
    const conversation = new Conversation();
    conversation[column] = value;
    conversation.id = conversationId;

    return await this.conversationRepository.save(conversation).catch(error => {
      this.rollbarLoggerService.error(error, 'Update Conversation');
      return null;
    });
  }
}
