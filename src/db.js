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

exports.saveConversation = async (conversationId) => {
  try {
    const conversation = await db.oneOrNone(
      'SELECT uniqueConversationId FROM conversation WHERE uniqueConversationId = $1',
      [conversationId],
    );

    if (!conversation) {
      await db.none('INSERT INTO conversation (uniqueConversationId) VALUES ($1)', [conversationId]);
    }
  } catch (e) {
    console.log(e);
  }
};
