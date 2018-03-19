const db = require('../db_connections');
const { databaseEmail } = require('../../emails');

const saveMessage = (speech, conversationId) => db.query(
  'INSERT INTO messages (chat, conversation_id) VALUES ($1, (SELECT id FROM conversation WHERE uniqueId = $2))',
  [speech, conversationId],
)
  .catch((error) => {
    databaseEmail('saving messages', error);
  });

module.exports = saveMessage;
