const { getBotResponsesBySlug } = require('./storyblok');
const { getConversationStage, getColumnForConversation } = require('./db/db');

const getSetupMessage = async (conversationId) => {
  // TODO: Chain all these awaits into a set of tasks
  const botResponses = await getBotResponsesBySlug('setup');
  // Todo pull this into a loop a la userMessage
  const isLanguageSet = await getColumnForConversation('language', conversationId);
  const isGDPRSet = await getColumnForConversation('gdpr', conversationId);

  // TODO: Set Storyblok up to translate
  if (!isLanguageSet) {
    const langResponse = botResponses.filter((response) => response.name === 'Language')[0].content;
    langResponse.speech = langResponse.speech.split(';');
    return langResponse;
  }
  if (!isGDPRSet) {
    const gdprResponse = botResponses.filter((response) => response.name === 'GDPR')[0].content;
    gdprResponse.speech = gdprResponse.speech.split(';');
    return gdprResponse;
  }

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
  const { conversationId } = req.body;

  const conversationStage = await getConversationStage(conversationId);

  switch (conversationStage) {
    case 'setup':
      return getSetupMessage(conversationId);
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
