/* eslint-disable */

CREATE EXTENSION pgcrypto;
CREATE TYPE stage_type AS ENUM ('setup', 'support', 'feedback');
CREATE TYPE sender_type AS ENUM ('bot', 'user');
CREATE TYPE supported_languages_type AS ENUM ('fr', 'en');

/* eslint-enable */

CREATE TABLE conversations (
  ID uuid PRIMARY KEY,
  time_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  stage stage_type NOT NULL,
  language supported_languages_type,
  gdpr BOOLEAN
);

CREATE TABLE messages (
  ID uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid,
  previous_message_id uuid,
  message VARCHAR NOT NULL,
  sender sender_type NOT NULL,
  storyblok_id uuid,
  time_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (previous_message_id) REFERENCES messages(id),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

// TODO:  ADd in this constraint once we have storyblok_id
// CONSTRAINT if_sender_is_bot_then_storyblok_id_is_not_null
//    CHECK ( NOT (sender = 'bot' AND storyblok_id IS NULL) )
