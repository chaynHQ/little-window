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

// queries
// TODO: Error checking instead of console.log
exports.saveConversation = async (conversationId) => {
  try {
    const conversation = await db.oneOrNone(
      'SELECT conversation_id FROM conversations WHERE conversation_id = $1',
      [conversationId],
    );

    if (!conversation) {
      await db.none('INSERT INTO conversations (conversation_id) VALUES ($1)', [conversationId]);
    }
  } catch (e) {
    console.log(e);
  }
};

exports.saveMessage = async (speech, conversationId) => {
  try {
    let conversation = await db.oneOrNone(
      'SELECT id FROM conversations WHERE conversation_id = ($1)',
      [conversationId],
    );

    if (!conversation) {
      conversation = await db.none('INSERT INTO conversations (conversation_id) VALUES ($1) RETURNING id', [conversationId]);
    }

    await db.none('INSERT INTO messages (conversation_id, speech) VALUES ($1, $2)', [conversationId, speech]);
  } catch (e) {
    console.log(e);
  }
};
