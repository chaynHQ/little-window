const db = require('../database/db_connections');

const checkChat = () => db.query('SELECT * FROM conversation');

module.exports = checkChat;
