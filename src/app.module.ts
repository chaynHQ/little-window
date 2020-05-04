import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { databaseConfig } from './common/database-connection';
import { ConversationModule } from './conversation/conversation.module';
import { UserMessageModule } from './userMessage/userMessage.module';
import { MessageModule } from './message/message.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig),
    ConversationModule,
    UserMessageModule,
    MessageModule,
  ],
})
export class AppModule {}
