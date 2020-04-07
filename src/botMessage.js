const { getBotResponsesBySlug, getBotResponsesByUuid } = require('./storyblok');
const { getConversationStage, getColumnForConversation, getMessagesByColumns } = require('./db/db');
const { getDialogflowResponse } = require('./dialogflow');

const formatBotResponse = (response, prefixMessages, conversationId) => {
  // To do - check that response isn't empty.
  const formattedResponse = {};
  formattedResponse.storyblokId = response.uuid;
  formattedResponse.conversationId = conversationId;
  formattedResponse.speech = prefixMessages.concat(response.content.speech.items);
  formattedResponse.resources = response.content.resources ? response.content.resources.items : [];

  if (response.checkBoxOptions) {
    formattedResponse.checkBoxOptions = response.checkBoxOptions
  } else if (response.content.checkBoxOptions){
    formattedResponse.checkBoxOptions = response.content.checkBoxOptions
  } else {
    formattedResponse.checkBoxOptions = []
  }
  if (response.radioButtonOptions) {
    formattedResponse.radioButtonOptions = response.radioButtonOptions
  } else if (response.content.radioButtonOptions){
    formattedResponse.radioButtonOptions = response.content.radioButtonOptions
  } else {
    formattedResponse.radioButtonOptions = []
  }
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

const getSupportMessage = async (data) => {
  console.log(data)

  const { previousMessageStoryblokId, conversationId } = data;
  const userResponse = data.speech;

  const botResponses = await getBotResponsesBySlug('support');

  const kickoffSupportMessageStoryblokId = process.env.kickoffSupportMessageStoryblokId;
  const freeTextSupportRequestStoryblokId = process.env.freeTextSupportRequestStoryblokId;
  const radioButtonSupportRequestStoryblokId = process.env.radioButtonSupportRequestStoryblokId;
  const setupMessages = [
    kickoffSupportMessageStoryblokId,
    freeTextSupportRequestStoryblokId,
    radioButtonSupportRequestStoryblokId
  ];

  if(userResponse.startsWith('TOPIC-')) {
    const topic = userResponse.slice('TOPIC-')
  }

  // Does req have topic & countries?
  // if yes, give them resources

  // if no countries, give ask them for countries

  // if no topic, ask them what they want

  // Start by asking them what they want
  // TURN THIS INTO A CASE STATEMENT
  console.log('STARTHEREH WITH TOPIC')
  if ( previousMessageStoryblokId === freeTextSupportRequestStoryblokId){
    // TO DO TOMORROW
    // console.log("START HERE")
    // getDialogflowResponse(conversationId, userResponse)

  } else if(typeof topic==undefined) {

    // THIS DOESN"T WORK

    console.log("WE HAVE A TOPIC")
    console.log(topic)
  } else if (previousMessageStoryblokId === kickoffSupportMessageStoryblokId) {
    if (userResponse === 'Yes'){
      [supportBotResponse] = botResponses.filter(response => response.uuid === freeTextSupportRequestStoryblokId)
    } else {
      // Send them message & checkboxes to choose their topic
      [supportBotResponse] = botResponses.filter(response => response.uuid === radioButtonSupportRequestStoryblokId)
      supportBotResponse.checkBoxOptions = botResponses.filter(
        response => setupMessages.indexOf(response.uuid) < 0).map(
          response => { return {'postback': 'TOPIC-' + response.name, 'text': response.name}})
    }
  } else {
    // Send first message
    [supportBotResponse] = botResponses.filter(response => response.uuid === kickoffSupportMessageStoryblokId)
  }

  return supportBotResponse;


  // If they do then give them allll the options (Calculate this from storyblok folders)

  // If they don't, give them an inputbox

  // Ask them the country question for their topic.

  // Only show them contries that have resources available

  // Show them resources

  // Show them follow up resources

  // Ask for any more

  // Move onto next stage of conversation.

}

exports.getBotMessage = async (req) => {
  // Setup useful data
  const userResponse = req.body.speech;
  const { conversationId, previousMessageId, previousMessageStoryblokId } = req.body;

  // const conversationStage = await getConversationStage(conversationId);

  const conversationStage = 'support';

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
      const supportBotResponse = await getSupportMessage(req.body);
      return formatBotResponse(supportBotResponse, [], conversationId);
    default:
      // Some error
      return null;
  }
};
