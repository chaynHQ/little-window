const { check, validationResult } = require('express-validator');
const {
  saveNewConversation, getConversationStage, updateConversationsTableByColumn,
} = require('./db/db');
const { getBotResponsesByUuid } = require('./storyblok');
const { getBotMessage } = require('./botMessage');

// TODO: Move into helpers
const indexOfEnd = (string, substring) => {
  const io = string.lastIndexOf(substring);
  return io === -1 ? -1 : io + substring.length;
};

const setupConversation = async (userResponse, conversationId) => {
  // User responses for setup should always be set in Storyblok like this:
  // SETUP-[Column Name]-[User Answer]
  const splitUserResponse = userResponse.split('-')

  const isSetup = splitUserResponse.length === 3 && splitUserResponse[0] === 'SETUP'

  if (isSetup) {
    try {
      updateConversationsTableByColumn(
        splitUserResponse[1],
        splitUserResponse[2],
        conversationId,
      )
    } catch {
      throw new Error('Can\'t find userResponse to setup question');
    }
  } else {
    throw new Error('Did not recieve correctly formatted setup data from user');
  }
};

exports.userMessage = async (req, res) => {
  // Check req was valid
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Setup useful data
  const userResponse = req.body.speech;
  const { conversationId } = req.body;

  // Save message & conversation
  const conversationStage = await getConversationStage(conversationId);
  if (conversationStage === 'setup') {
    try {
      await setupConversation(userResponse, conversationId);
    } catch (error) {
      // console.log(error);
      // TODO: IS 422 the right response here?
      // Answer: NO
      return res.status(422).json({
        errors: [{
          value: null,
          msg: 'Problem retrieving response',
        }],
      });
    }
  }

  // TODO: Setup a new endpoint to start a conversation.
  // In this check we have all the questions we need from storyblok
  // Create a new id and save it to the database.
  // Send a proper error message back if it's no working
  await saveNewConversation(conversationId);

  try {
    // Get & send response
    getBotMessage(req, res).then((response) => {
      res.send(response);
    });

    // // GET BOT RESPONSE FROM DIALOGFLOW
    // getResponse(req, res).then((response) => {
    //   res.send(response);
    //
    // });

    // SAVING
    // If the request is from the user, save that request & save the bots response
    // TODO: THIS ISN"T SAVING right
    //   if (req.body.sender == 'user') {
    //     console.log("Saving user message")
    //     console.log(req.body)
    //     saveMessage(
    //       req.body.conversationId,
    //       req.body.speech,
    //       'user',
    //       req.body.previousMessageId || null)
    //     .then(
    //       user_message_id => {
    //         console.log('Then saving bot message')
    //         saveMessage(req.body.conversationId, response, 'bot', user_message_id || null).then(
    //           bot_message_id => {
    //             response.message_id = bot_message_id;
    //             res.send(response);
    //           }
    //         );
    //       })
    //   } else {
    //     console.log('Saving bot message')
    // //     saveMessage(
    //           req.body.conversationId,
    //           response,
    //           'bot',
    //           req.body.previousMessageId || null
    //         ).then(
    //           bot_message_id => {
    //             response.message_id = bot_message_id;
    //             res.send(response);
    //           }
    //         );
    //   }
    //
  } catch {
    // TODO: IS 422 the right response here?
    return res.status(422).json({
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
