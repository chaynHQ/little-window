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
    // console.log(e);
    return null;
  }
};
// This can be deleted and use getColumnForConversation instead
exports.getConversationStage = (conversationId) => {
  try {
    return db.oneOrNone(
      'SELECT stage FROM conversations WHERE id = $1',
      [conversationId],
    ).then((response) => (response ? response.stage : 'null'));
  } catch (e) {
    // console.log(e);
    return null;
  }
};

// TODO: Column isn't the technical term here. UPDATE
// Get Column by Conversation_ID
exports.getColumnForConversation = (column, conversationId) => {
  try {
    return db.oneOrNone(
      'SELECT $1:raw FROM conversations WHERE id = $2',
      [column, conversationId],
    ).then((response) => (response ? response[column] : null));
  } catch (e) {
    // console.log(e);
    return null;
  }
};

exports.updateConversationsTableByColumn = (column, value, conversationId) => {
  try {
    return db.none('UPDATE conversations SET $1:raw = $2 WHERE id = $3', [column, value, conversationId]);
  } catch (e) {
    // console.log(e);
    return null;
  }
};

exports.saveMessage = async (data, sender) => {
  let message = data.speech;
  if (data.selectedTags) {
    data.selectedTags.forEach((tag) => { message = `${message}-${tag.text}`; });
  }
  try {
    const messageId = await db.one('INSERT INTO messages (conversation_id, message, sender, previous_message_id, storyblok_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [data.conversationId, message, sender, data.previousMessageId, data.storyblokId]);
    return messageId.id;
  } catch (e) {
    // console.log(e);
    return null;
  }
};

exports.getMessagesByColumns = async (searchPairs) => {
  let searchString = 'SELECT * FROM messages WHERE';
  let count = 1;
  const searchParameters = [];

  searchPairs.forEach((pair, i, arr) => {
    searchString = `${searchString} $${count}:raw = $${count + 1}`;
    count += 2;
    if (arr.length - 1 !== i) {
      searchString = `${searchString} AND`;
    }
    searchParameters.push(pair.column, pair.value);
  });

  try {
    return db.manyOrNone(
      searchString,
      searchParameters,
    ).then((response) => (response));
  } catch (e) {
    // console.log(e);
    return null;
  }
};
