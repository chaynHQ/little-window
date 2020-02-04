const db = require('../db_connections');
const { databaseEmail } = require('../../emails');

const saveConversation = (conversationId) => db
  .query('INSERT INTO conversation (uniqueConversationId) VALUES ($1)', [conversationId])
  .catch((error) => {
    databaseEmail('saving conversation', error);
  });

module.exports = saveConversation;
