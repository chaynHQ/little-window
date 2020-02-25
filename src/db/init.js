CREATE TABLE conversations (
  ID uuid PRIMARY KEY,
  time_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE EXTENSION pgcrypto;
CREATE TYPE sender_type AS ENUM ('bot', 'user');

CREATE TABLE messages (
  ID uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid,
  previous_message uuid,
  message VARCHAR NOT NULL,
  sender sender_type NOT NULL,
  storyblok_id uuid,
  time_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (previous_message) REFERENCES messages(id),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  CONSTRAINT if_sender_is_bot_then_storyblok_id_is_not_null
   CHECK ( NOT (sender = 'bot' AND storyblok_id IS NULL) )
);
