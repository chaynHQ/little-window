import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, Check} from "typeorm";
import { Conversation} from '../conversation/conversation.entity';

export type SenderType = "bot" | "user"

@Entity()
@Check(`NOT (sender = 'bot' AND storyblok_id IS NULL)`)
export class Message {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    message: string;

    @Column()
    sender: SenderType;

    @Column()
    storyblok_id: string;

    @ManyToOne(type => Conversation, conversation => conversation.id)
    conversation_: Conversation;

    @OneToOne(type => Message)
    @JoinColumn()
    previousmessage_: Message;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    time_created: Date

}


// CREATE TABLE message (
//   conversation_id uuid,
// FOREIGN KEY (conversation_id) REFERENCES conversation(id)
//   previous_message_id uuid,
//
//   FOREIGN KEY (previous_message_id) REFERENCES message(id),
//
// );

// TODO:  ADd in this constraint once we have storyblok_id
// CONSTRAINT if_sender_is_bot_then_storyblok_id_is_not_null
//    CHECK ( NOT (sender = 'bot' AND storyblok_id IS NULL) )

// sender sender_type NOT NULL,
//   storyblok_id uuid,
