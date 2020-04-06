const { getBotResponsesBySlug } = require('./storyblok');
const { getConversationStage, getColumnForConversation } = require('./db/db');

const formatBotResponse = (response, prefixMessages) => {
  response.speech = prefixMessages.concat(response.speech.split(';'));
  return response;
}
const getSetupMessage = async (userResponse, conversationId, previousMessageId) => {
  let botResponse = {};
  let prefixMessages = [];

  // TODO: IF someone is updating their preferred lang we need to send a message that tells them we'll talk in English
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
    if (userResponse === 'SETUP-language-None'){
      botResponse = botResponses.filter((response) => response.name === 'new-language')[0].content;
    } else {
      botResponse = botResponses.filter((response) => response.name === 'Language')[0].content;
    }
  } else if (!isGDPRSet) {
    botResponse = botResponses.filter((response) => response.name === 'GDPR')[0].content;
  } else {
    // Everything is set!!
  }

  // If someone just asked for a language we don't have tell
  // them we will speak in English
  if (botResponses.filter(response => response.name === 'new-language')[0].content['_uid'] === previousMessageId) {
    prefixMessages.push(botResponses.filter(response => response.name === 'new-language-submitted')[0].content.speech)
  }

  return formatBotResponse(botResponse, prefixMessages);

  console.log("I'VE REACHED THIS POINT")

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
