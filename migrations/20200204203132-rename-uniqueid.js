exports.up = function (db, callback) {
  db.renameColumn('conversations', 'uniqueid', 'conversation_id', callback);
};

exports.down = function (db, callback) {
  db.renameColumn('conversations', 'conversation_id', 'uniqueid', callback);
};
