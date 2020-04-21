import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'

import { AppService } from './app.service';
import { databaseConfig } from './services/database-connection';
import { ConversationModule } from './conversation/conversation.module';

import { UserMessageController } from './userMessage/userMessage.controller';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(databaseConfig),
    ConversationModule
  ],
  controllers: [UserMessageController],
  providers: [AppService],
})
export class AppModule {}
