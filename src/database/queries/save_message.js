const db = require('../db_connections');
const { databaseEmail } = require('../../emails');

// query only inserts into messages if the conversation id has been set
// this is to stop the three automatic messages at the start being inputted into the db
const saveMessage = (speech, conversationId) =>
  db
    .query(
      `
  DO $$
  DECLARE conv_id integer := (SELECT id FROM conversation WHERE uniqueid = $2);
  BEGIN
  IF (conv_id >= 0) THEN
  INSERT INTO messages (chat, conversation_id)
  VALUES ($1, (SELECT id FROM conversation WHERE uniqueId = $2));
  END IF;
  END $$;`,
      [speech, conversationId]
    )
    .catch((error) => {
      databaseEmail('saving messages', error);
    });

module.exports = saveMessage;
