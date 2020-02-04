exports.up = function (db, callback) {
  db.renameColumn('messages', 'chat', 'speech', callback);
};

exports.down = function (db, callback) {
  db.renameColumn('messages', 'speech', 'chat', callback);
};
