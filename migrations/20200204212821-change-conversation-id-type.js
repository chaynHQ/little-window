exports.up = function (db, callback) {
  db.changeColumn('messages', 'conversation_id', { type: 'varchar' }, callback);
};

exports.down = function () {

};
