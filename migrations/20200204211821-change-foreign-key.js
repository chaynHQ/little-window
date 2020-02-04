exports.up = function (db, callback) {
  db.removeForeignKey('messages', 'messages_conversation_id_fkey', callback);
};

exports.down = function (db, callback) {
  db.addForeignKey('messages', 'conversations', 'messages_conversation_id_fkey',
    {
      conversation_id: 'id',
    },
    {
      onDelete: 'CASCADE',
    }, callback);
};
