import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { Message } from './message.entity';

@Module({
  providers: [MessageService],
  imports: [TypeOrmModule.forFeature([Message])],
  exports: [MessageService],
})
export class MessageModule {}
