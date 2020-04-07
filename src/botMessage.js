const { getBotResponsesBySlug } = require('./storyblok');
const { getConversationStage, getColumnForConversation, getMessagesByColumns } = require('./db/db');

const formatBotResponse = (response, prefixMessages, conversationId) => {
  // To do - check that response isn't empty.
  const formattedResponse = {};
  formattedResponse.storyblokId = response.uuid;
  formattedResponse.conversationId = conversationId;
  formattedResponse.speech = prefixMessages.concat(response.content.speech.items);
  formattedResponse.resources = response.content.resources ? response.content.resources.items : [];
  formattedResponse.checkBoxOptions = response.content.checkBoxOptions
    ? response.content.checkBoxOptions : [];
  formattedResponse.radioButtonOptions = response.content.radioButtonOptions
    ? response.content.radioButtonOptions : [];
  return formattedResponse;
};

// TODO: I don't think we still need previousMessageId here
const getSetupMessage = async (
  userResponse,
  conversationId,
  previousMessageId,
  previousMessageStoryblokId) => {
  let setupBotResponse = {};
  const prefixMessages = [];

  // TODO: Chain all these awaits into a set of tasks
  const botResponses = await getBotResponsesBySlug('setup');
  const isLanguageSet = await getColumnForConversation('language', conversationId);
  const isGDPRSet = await getColumnForConversation('gdpr', conversationId);

  // TODO: Set Storyblok up to translate
  if (!isLanguageSet) {
    // TODO: Need better checking in place to ensure users can't type this in
    // when they are typing in a general input.
    // Potential solution validate how the input was inputed by the user.
    if (userResponse === 'SETUP-language-None') {
      [setupBotResponse] = botResponses.filter((response) => response.name === 'new-language');
    } else {
      [setupBotResponse] = botResponses.filter((response) => response.name === 'Language');
    }
  } else if (!isGDPRSet) {
    if (isGDPRSet === false) {
      [setupBotResponse] = botResponses.filter((response) => response.slug === 'gdpr-reject');
    } else if (userResponse === 'SETUP-gdpr-more') {
      [setupBotResponse] = botResponses.filter((response) => response.slug === 'gdpr-more');
    } else {
      [setupBotResponse] = botResponses.filter((response) => response.name === 'GDPR');
    }
  } else {
    // Everything is set!!
    console.log('language', isLanguageSet);
    console.log('GDPR', isGDPRSet);
  }

  // If someone just asked for a language we don't have tell
  // them we will speak in English
  if (botResponses.filter((response) => response.name === 'new-language')[0].uuid === previousMessageStoryblokId) {
    prefixMessages.concat(botResponses.filter((response) => response.name === 'new-language-submitted')[0].content.speech.items);
  }
  return { setupBotResponse, prefixMessages };

  // Else move past setup section
  //
  // return getBotResponses().then(responses => {
  //   console.log(responses)
  //
  //   return responses;
  //   });
  // TODO!!
};

const getFeedbackMessage = async (conversationId) => {
  // Get all the bot responses
  const botResponses = await getBotResponsesBySlug('feedback');
  // Get all the user messages by convo id
  const userMessages = await getMessagesByColumns([
    { column: 'conversation_id', value: conversationId },
  ]);

  // SORT bot responses
  botResponses.sort((a, b) => {
    if (a.slug < b.slug) {
      return -1;
    } if (a.slug > b.slug) {
      return 1;
    }
    return 0;
  });

  const feedbackBotResponse = botResponses.find((response) => {
    if (userMessages.filter(
      (userMessage) => userMessage.storyblok_id === response.uuid,
    ).length === 0) {
      return true;
    }
    return false;
  });

  return feedbackBotResponse;
};

exports.getBotMessage = async (req) => {
  // Setup useful data
  const userResponse = req.body.speech;
  const { conversationId, previousMessageId, previousMessageStoryblokId } = req.body;

  // const conversationStage = await getConversationStage(conversationId);

  const conversationStage = 'feedback';

  switch (conversationStage) {
    case 'setup': {
      const { setupBotResponse, prefixMessages } = await getSetupMessage(
        userResponse,
        conversationId,
        previousMessageId,
        previousMessageStoryblokId,
      );
      return formatBotResponse(setupBotResponse, prefixMessages, conversationId);
    }
    case 'feedback': {
      const feedbackBotResponse = await getFeedbackMessage(conversationId);
      return formatBotResponse(feedbackBotResponse, [], conversationId);
    }
    case 'support':
      // code block
      return;
    default:
      // Some error
      return null;
  }
};
