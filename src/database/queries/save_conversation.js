const db = require('../db_connections');
const { databaseEmail } = require('../../emails');

const saveConversation = conversationId => {
  return db
    .query('INSERT INTO conversation (uniqueId) VALUES ($1)', [conversationId])
    .catch(error => {
      // databaseEmail('saving conversation', error);
    });
};

module.exports = saveConversation;

