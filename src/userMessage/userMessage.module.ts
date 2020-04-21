import { Module } from '@nestjs/common';
import { UserMessageController } from './userMessage.controller';
import { UserMessageService }from './userMessage.service';

@Module({
  imports: [],
  controllers: [UserMessageController],
  providers: [UserMessageService],
})

export class UserMessageModule {}
