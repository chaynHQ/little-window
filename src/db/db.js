const pgp = require('pg-promise')();
const url = require('url');

// Connection
const params = url.parse(process.env.DATABASE_URL);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user: username,
  password,
  ssl: params.hostname !== 'localhost',
};

const db = pgp(options);

// Queries
// TODO: Error checking instead of console.log
exports.saveNewConversation = (conversationId) => {
  try {
    db.none(
      'INSERT INTO conversations (id, stage) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING;',
      [conversationId, 'setup'],
    );
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

exports.getConversationStage = (conversationId) => {
  try {
    return db.oneOrNone(
      'SELECT stage FROM conversations WHERE id = $1',
      [conversationId],
    ).then((response) => (response ? response.stage : 'null'));
  } catch (e) {
    console.log(e);
    return null;
  }
};

// TODO: Column isn't the technical term here. UPDATE
exports.getColumnForConversation = (column, conversationId) => {
  try {
    return db.oneOrNone(
      'SELECT $1:raw FROM conversations WHERE id = $2',
      [column, conversationId],
    ).then((response) => (response ? response[column] : null));
  } catch (e) {
    console.log(e);
    return null;
  }
};

exports.updateConversationsTableByColumn = (column, value, conversationId) => {
  try {
    return db.none('UPDATE conversations SET $1:raw = $2 WHERE id = $3', [column, value, conversationId]);
  } catch (e) {
    console.log(e);
    return null;
  }
};

exports.saveMessage = async (data, sender) => {
  // console.log("Starting Message")
  // console.log('conversation_id', data.conversationId)
  // console.log('message', data.speech)
  // console.log('sender', sender)
  // console.log('previous_message_id', data.previousMessageId)
  // console.log('storyblok_id', data['_uid'])


  try {
    const messageId = await db.one('INSERT INTO messages (conversation_id, message, sender, previous_message_id, storyblok_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [data.conversation_id, data.speech, sender, data.previousMessageId, data._uid]);
    return messageId.id;
  } catch (e) {
    console.log(e);
    return null;
  }
};
