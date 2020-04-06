const { check, validationResult } = require('express-validator');
const {
  saveNewConversation, getConversationStage, updateConversationsTableByColumn,
} = require('./db/db');
const { getBotResponsesByUuid, getBotResponsesBySlug } = require('./storyblok');
const { getBotMessage } = require('./botMessage');

// TODO: Move into helpers
const indexOfEnd = (string, substring) => {
  const io = string.lastIndexOf(substring);
  return io === -1 ? -1 : io + substring.length;
};

const setupConversation = async (userResponse, conversationId, previousMessageId) => {
  // TODO: Can we do something nice with the getBotResponsesBySlug
  // so we don't have to filter afterwards.
  const splitUserResponse = userResponse.split('-')
  const botResponses = await getBotResponsesBySlug('setup');

  const previousMessageWasSetupMessage =
    botResponses.filter(response => response.content['_uid'] === previousMessageId).length > 0;

  if (previousMessageWasSetupMessage) {
    // Check if it's formatted to be saved
    const isFormattedLikeSetupAnswer = splitUserResponse.length === 3 && splitUserResponse[0] === 'SETUP'
    if (isFormattedLikeSetupAnswer) {
      try {
        updateConversationsTableByColumn(
          splitUserResponse[1],
          splitUserResponse[2],
          conversationId,
        )
      } catch {
        throw new Error('Can\'t find userResponse to setup question');
      }
    } else if (botResponses.filter(response => response.name === 'new-language')[0].content['_uid'] === previousMessageId) {
      updateConversationsTableByColumn(
        'language',
        'English',
        conversationId,
      )
    } else {
      console.log("Previous message was setup message, but we can't save it")
    }
  } else {
    console.log("STARTING NEW CONVERSATION")
    // Start new conversation so do nothing
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
  const { conversationId, previousMessageId } = req.body;

  if (userResponse === 'SETUP-NEWCONVERSATION') {
    await saveNewConversation(conversationId);
  }

  // Save message & conversation
  const conversationStage = await getConversationStage(conversationId);

  if (conversationStage === 'setup') {
    try {
      await setupConversation(userResponse, conversationId, previousMessageId);
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
