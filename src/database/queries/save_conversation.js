const db = require('../db_connections');

const saveConversation = conversationId =>
  db.query('INSERT INTO conversation (uniqueId) VALUES ($1)', [conversationId])
    .catch((error) => {
      console.log('saveConversation error', error)
    });


module.exports = saveConversation;
