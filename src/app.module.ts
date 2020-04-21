import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'

import { databaseConfig } from './services/database-connection';
import { ConversationModule } from './conversation/conversation.module';

import { UserMessageModule } from './userMessage/userMessage.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(databaseConfig),
    ConversationModule,
    UserMessageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
