const db = require("../db_connections");

const saveConversation = conversationId => {
  return db
    .query(
      `SELECT(case when exists (select uniqueId from conversation where uniqueId = $1) then 1 else 0 end)`,
      [conversationId]
    )
    .then(res => {
      if (res[0].case === 0) {
        return db.query(`INSERT INTO conversation (uniqueId) VALUES ($1)`, [
          conversationId
        ]);
      }
    });
};

module.exports = saveConversation;
