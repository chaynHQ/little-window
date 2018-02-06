const db = require('../database/db_connections');

const checkChat = () => {
    return db.query(`SELECT * FROM chatlog`)
};

module.exports = checkChat;