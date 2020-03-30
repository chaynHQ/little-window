const { getBotResponsesBySlug } = require('./storyblok');
const { getConversationStage, getColumnForConversation } = require('./db/db');

const getSetupMessage = async (conversationId) => {
  // TODO: Chain all these awaits into a set of tasks
  const botResponses = await getBotResponsesBySlug('setup');

  const isLanguageSet = await getColumnForConversation('language', conversationId);
  const isGDPRSet = await getColumnForConversation('gdpr', conversationId);

  if (!isLanguageSet) {
    return botResponses.filter((response) => response.name === 'Language')[0].content;
  }
  if (!isGDPRSet) {
    return botResponses.filter((response) => response.name === 'GDPR')[0].content;
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
