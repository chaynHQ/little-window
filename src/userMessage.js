const { check, validationResult } = require('express-validator');
// const { saveConversation, saveMessage } = require('./db');
const { getResponse } = require('./dialogFlow');

exports.userMessage = (req, res) => {
  // Check req was valid
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  // Save message & conversation
  // saveConversation(req.body.conversationId);
  // saveMessage(req.body.speech, req.body.conversationId);

  try {
    // Get & send response
    getResponse(req, res).then((response) => {
      // saveMessage(response, req.body.conversationId);
      res.send(response);
    });
  } catch {
    res.status(422).json({
      errors: [{
        value: null,
        msg: 'Problem retrieving response',
      }],
    });
  }
};

exports.validate = () => [
  check('speech').not().isEmpty().withMessage('must not be empty'),
  check('lang').not().isEmpty().withMessage('must not be empty'), // TODO: should we update this to isIn(str, values)
  check('conversationId').isUUID(4).withMessage('must be a UUID'),
];
