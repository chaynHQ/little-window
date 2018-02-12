const { addChatLog } = require('./database/queries');

const saveChatLog = (req, res) => {  
  const chatLogJSON = JSON.stringify(req.body);
  addChatLog(chatLogJSON)
  .then(() => res.send())
  .catch(err => console.log(err))

}

module.exports = saveChatLog;
