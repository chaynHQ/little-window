exports.up = function (db, callback) {
  db.renameTable('conversation', 'conversations', callback);
};

exports.down = function (db, callback) {
  db.renameTable('conversations', 'conversation', callback);
};
