import { Module } from '@nestjs/common';
import { UserMessageController } from './userMessage.controller';
import { UserMessageService }from './userMessage.service';

@Module({
  controllers: [UserMessageController],
  providers: [UserMessageService],
  imports: [],
  exports: [UserMessageService]
})

export class UserMessageModule {}
