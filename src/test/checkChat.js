const db = require("../database/db_connections");

const checkChat = () => {
  return db.query(`SELECT * FROM conversation`);
};

module.exports = checkChat;
