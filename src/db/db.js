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

// function existsConversation(conversationId) {
//   return db.oneOrNone(
//     'SELECT conversation_id FROM conversations WHERE conversation_id = $1',
//     [conversationId],
//   );
// }

// Queries
// TODO: Error checking instead of console.log
exports.saveConversation = (conversationId) => {
  try {
    db.none('INSERT INTO conversations (id) VALUES ($1) ON CONFLICT (id) DO NOTHING;', [conversationId]);
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

exports.saveMessage = (conversationId, speech, sender, previous_message_id) => {

  // TODO: Get the storyblok_id

  // TODO: PREVIOUS ID = get generated it, add it to response, make front end return it too

  try {
    db.none('INSERT INTO messages (conversation_id, message, sender, previous_message) VALUES ($1, $2, $3, $4)',
    [conversationId, speech, sender, previous_message_id]);
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
