import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-rollbar';

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
    LoggerModule.forRoot({
           accessToken: process.env.ROLLBAR_TOKEN,
           environment: process.env.NODE_ENV,
       }),
  ],
})
export class AppModule {}
