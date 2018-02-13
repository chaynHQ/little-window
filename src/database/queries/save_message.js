const db = require("../db_connections");

const saveMessage = (speech, conversationId) => {
  return db.query(
    `INSERT INTO messages (chat, conversation_id) VALUES ($1, (SELECT id FROM conversation WHERE uniqueId = $2))`,
    [speech, conversationId]
  );
};

module.exports = saveMessage;
