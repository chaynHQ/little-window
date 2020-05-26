import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-rollbar';

import * as databaseConfig from './common/database-connection';
import { ConversationModule } from './conversation/conversation.module';
import { UserMessageModule } from './userMessage/userMessage.module';
import { MessageModule } from './message/message.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
      accessToken: process.env.NODE_ENV === 'production' ? process.env.ROLLBAR_TOKEN : null,
      environment: process.env.HEROKU_PR_NUMBER ? 'pr-' + process.env.HEROKU_PR_NUMBER : process.env.ROLLBAR_ENV,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
    }),
  ],
})
export class AppModule {}
