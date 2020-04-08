const { check, validationResult } = require('express-validator');
const {
  saveNewConversation, getConversationStage, updateConversationsTableByColumn, saveMessage,
} = require('./db/db');
const { getBotResponsesBySlug } = require('./storyblok');
const { getBotMessage } = require('./botMessage');

const setupConversation = async (userResponse, conversationId, previousMessageStoryblokId) => {
  // TODO: Can we do something nice with the getBotResponsesBySlug
  // so we don't have to filter afterwards.
  const splitUserResponse = userResponse.split('-');
  const botResponses = await getBotResponsesBySlug('setup');

  const previousMessageWasSetupMessage = botResponses.filter(
    (response) => response.uuid === previousMessageStoryblokId,
  ).length > 0;

  if (previousMessageWasSetupMessage) {
    // Check if it's formatted to be saved
    const isFormattedLikeSetupAnswer = splitUserResponse.length === 3 && splitUserResponse[0] === 'SETUP';
    if (isFormattedLikeSetupAnswer) {
      try {
        await updateConversationsTableByColumn(
          splitUserResponse[1],
          splitUserResponse[2],
          conversationId,
        );
      } catch {
        throw new Error('Can\'t find userResponse to setup question');
      }
    } else if (botResponses.filter((response) => response.name === 'new-language')[0].content.uuid === previousMessageStoryblokId) {
      updateConversationsTableByColumn(
        'language',
        'English',
        conversationId,
      );
    }
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
  const { conversationId, previousMessageStoryblokId } = req.body;

  if (userResponse === 'SETUP-NEWCONVERSATION') {
    await saveNewConversation(conversationId);
  }

  const userMessageId = await saveMessage(req.body, 'user');

  const conversationStage = await getConversationStage(conversationId);

  if (conversationStage === 'setup') {
    try {
      await setupConversation(userResponse, conversationId, previousMessageStoryblokId);
    } catch (error) {
      console.log(error);
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
    getBotMessage(req.body).then(async (response) => {
      response.previousMessageId = userMessageId;
      response.messageId = await saveMessage(response, 'bot');
      res.send(response);
    });
    return null;

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
