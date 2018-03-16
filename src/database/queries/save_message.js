const db = require('../db_connections');

const saveMessage = (speech, conversationId) => db.query(
  'INSERT INTO messages (chat, conversation_id) VALUES ($1, (SELECT id FROM conversation WHERE uniqueId = $2))',
  [speech, conversationId],
)
  .catch((error) => {
    console.log('saveMessage in db', error);
  });

module.exports = saveMessage;
