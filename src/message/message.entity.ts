import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import { Conversation } from '../conversation/conversation.entity';

export type SenderType = 'bot' | 'user';

@Entity()
@Check(`NOT (sender = 'bot' AND storyblok_id IS NULL)`)
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  sender: SenderType;

  @Column()
  storyblok_id: string;

  @ManyToOne(
    () => Conversation,
    conversation => conversation.id,
  )
  conversation_: Conversation;

  @OneToOne(() => Message)
  @JoinColumn()
  previousmessage_: Message;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time_created: Date;
}
