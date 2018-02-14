const db = require("../database/db_connections");

const checkChat = () => {
  console.log("checking chat");
  return db.query(`SELECT * FROM conversation`);
};

module.exports = checkChat;
