const db = require('../database/db_connections');

const checkMessages = (id) => db.query('SELECT * FROM messages WHERE id = $1', [id]);

module.exports = checkMessages;
