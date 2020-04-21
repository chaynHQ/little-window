import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { UserMessageController } from './userMessage/userMessage.controller';
import { ConversationController } from './conversation/conversation.controller';
import { AppService } from './app.service';
import { databaseConfig } from './services/database-connection';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(databaseConfig)
  ],
  controllers: [UserMessageController, ConversationController],
  providers: [AppService],
})
export class AppModule {}
