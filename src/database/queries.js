const db = require('./db_connections');

const addChatLog = (chatObj) => {
    return db.query(`INSERT INTO chatlog (chat) VALUES ($1)`, [chatObj]);
}

module.exports = addChatLog;