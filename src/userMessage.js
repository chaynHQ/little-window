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
    const isFormattedLikeSetupAnswer = splitUserResponse.length === 3 && splitUserResponse[0] === 'SETUP';
    if (isFormattedLikeSetupAnswer) {
      try {
        await updateConversationsTableByColumn(
          splitUserResponse[1],
          splitUserResponse[2],
          conversationId,
        );
      } catch (error) {
        // console.log(error);
      }
    } else if (botResponses.filter((response) => response.name === 'new-language')[0].uuid === previousMessageStoryblokId) {
      await updateConversationsTableByColumn(
        'language',
        'en',
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
    getBotMessage(req.body).then(async (botResponses) => {
      const formattedResponses = [];
      for (const [index, response] of botResponses.entries()) {
        if (index === 0) {
          response.previousMessageId = userMessageId;
        } else {
          response.previousMessageId = botResponses[index - 1].messageId;
        }
        response.messageId = await saveMessage(response, 'bot');

        formattedResponses.push(response);
      }
      console.log(formattedResponses);
      return res.send(formattedResponses);
    });
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
