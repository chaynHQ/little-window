const db = require('../db_connections');
const { databaseEmail } = require('../../emails');

const saveMessage = (speech, conversationId) => db.query(
//   'INSERT INTO messages (chat, conversation_id) VALUES ($1, (SELECT id FROM conversation WHERE uniqueId = $2))',
//   [speech, conversationId],
// )
  `
  IF ((SELECT * FROM conversation WHERE uniqueid = '$2') >= 1)
  BEGIN
  INSERT INTO messages (chat, conversation_id)
  VALUES ($1, (SELECT id FROM conversation WHERE uniqueId = $2))
  END IF`, [speech, conversationId])
  .catch((error) => {
    console.log(error);
    console.log('db error fuck');
    databaseEmail('saving messages', error);
  });

module.exports = saveMessage;


IF ((SELECT * FROM conversation WHERE uniqueid = 'a1c09096-2c13-45ae-97fa-cea86a857c2b') >= 1)
  BEGIN
  INSERT INTO messages (chat, conversation_id)
  VALUES ('blah', (SELECT id FROM conversation WHERE uniqueId = 'a1c09096-2c13-45ae-97fa-cea86a857c2b'))
  END IF