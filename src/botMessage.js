const { getBotResponsesBySlug } = require('./storyblok');
const { getConversationStage, getColumnForConversation } = require('./db/db');

const formatBotResponse = (response, prefixMessages) => {
  console.log(prefixMessages);
  response.speech = prefixMessages.concat(response.speech.items);
  response.resources = response.resources ? response.resources.items : undefined;
  return response;
};

const getSetupMessage = async (userResponse, conversationId, previousMessageId) => {
  let botResponse = {};
  const prefixMessages = [];

  // TODO: IF someone is updating their preferred lang we need to send a
  // message that tells them we'll talk in English
  // TODO: Chain all these awaits into a set of tasks
  const botResponses = await getBotResponsesBySlug('setup');
  // TODO: pull this into a loop a la userMessage
  const isLanguageSet = await getColumnForConversation('language', conversationId);
  const isGDPRSet = await getColumnForConversation('gdpr', conversationId);

  // TODO: Set Storyblok up to translate
  if (!isLanguageSet) {
    // TODO: Need better checking in place to ensure users can't type this in
    // when they are typing in a general input.
    // Potential solution validate how the input was inputed by the user.
    if (userResponse === 'SETUP-language-None') {
      botResponse = botResponses.filter((response) => response.name === 'new-language')[0].content;
    } else {
      botResponse = botResponses.filter((response) => response.name === 'Language')[0].content;
    }
  } else if (!isGDPRSet) {
    if (isGDPRSet === false) {
      botResponse = botResponses.filter((response) => response.slug === 'gdpr-reject')[0].content;
    } else if (userResponse === 'SETUP-gdpr-more') {
      botResponse = botResponses.filter((response) => response.slug === 'gdpr-more')[0].content;
    } else {
      botResponse = botResponses.filter((response) => response.name === 'GDPR')[0].content;
    }
  } else {
    // Everything is set!!
    console.log('language', isLanguageSet);
    console.log('GDPR', isGDPRSet);
  }

  // If someone just asked for a language we don't have tell
  // them we will speak in English
  if (botResponses.filter((response) => response.name === 'new-language')[0].content._uid === previousMessageId) {
    prefixMessages.concat(botResponses.filter((response) => response.name === 'new-language-submitted')[0].content.speech.items);
  }

  return formatBotResponse(botResponse, prefixMessages);

  // Else move past setup section
  //
  // return getBotResponses().then(responses => {
  //   console.log(responses)
  //
  //   return responses;
  //   });
  // TODO!!
  return null;
};

exports.getBotMessage = async (req) => {
  // Setup useful data
  const userResponse = req.body.speech;
  const { conversationId, previousMessageId } = req.body;

  const conversationStage = await getConversationStage(conversationId);

  switch (conversationStage) {
    case 'setup':
      return getSetupMessage(userResponse, conversationId, previousMessageId);
    // case 'feedback':
    //   // code block
    //   return;
    // case 'support':
    //   // code block
    //   return;
    default:
      // Some error
      return null;
  }
};
