const { getBotResponsesBySlug } = require('./storyblok');
const {
  getConversationStage,
  getColumnForConversation,
  getMessagesByColumns,
  updateConversationsTableByColumn,
} = require('./db/db');
const { getDialogflowResponse } = require('./dialogflow');

const formatBotResponse = (response, prefixMessages, suffixMessages, conversationId) => {
  const speech = [];

  [...prefixMessages, response, ...suffixMessages].forEach((message) => {
    message.content.speech.items.forEach((text, i, arr) => {
      if (arr.length - 1 === i && response.content.resources) {
        speech.push({
          text,
          storyblokId: message.uuid,
          resources: message.content.resources.items,
        });
      } else {
        speech.push({ text, storyblokId: message.uuid });
      }
    });
  });

  // To do - check that response isn't empty.
  const formattedResponse = {};
  formattedResponse.conversationId = conversationId;
  formattedResponse.speech = speech;

  if (suffixMessages.length > 0
    && suffixMessages[suffixMessages.length - 1].content.checkBoxOptions) {
    formattedResponse.checkBoxOptions = suffixMessages[suffixMessages.length - 1].content.checkBoxOptions;
  } else if (response.checkBoxOptions) {
    formattedResponse.checkBoxOptions = response.checkBoxOptions;
  } else if (response.content.checkBoxOptions) {
    formattedResponse.checkBoxOptions = response.content.checkBoxOptions;
  } else {
    formattedResponse.checkBoxOptions = [];
  }

  if (suffixMessages.length > 0 && suffixMessages[suffixMessages.length - 1].radioButtonOptions) {
    formattedResponse.radioButtonOptions = suffixMessages[suffixMessages.length - 1].radioButtonOptions;
  } else if (response.radioButtonOptions) {
    formattedResponse.radioButtonOptions = response.radioButtonOptions;
  } else if (response.content.radioButtonOptions) {
    formattedResponse.radioButtonOptions = response.content.radioButtonOptions;
  } else {
    formattedResponse.radioButtonOptions = [];
  }
  return formattedResponse;
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
  const { previousMessageStoryblokId, conversationId, selectedTags } = data;
  const userResponse = data.speech;

  const botResponses = await getBotResponsesBySlug('support');

  const { kickoffSupportMessageStoryblokId } = process.env;
  const { freeTextSupportRequestStoryblokId } = process.env;
  const { radioButtonSupportRequestStoryblokId } = process.env;
  const { resourceStoryblokId } = process.env;
  const { additionalResourcesStoryblokId } = process.env;
  const { anythingElseStoryblokId } = process.env;
  const setupMessages = [
    kickoffSupportMessageStoryblokId,
    freeTextSupportRequestStoryblokId,
    radioButtonSupportRequestStoryblokId,
    resourceStoryblokId,
    additionalResourcesStoryblokId,
    anythingElseStoryblokId,
  ];

  let supportBotResponse = {};
  let suffixMessages = [];

  if (previousMessageStoryblokId === freeTextSupportRequestStoryblokId) {
    // TO DO TOMORROW
    // console.log("START HERE")
    // getDialogflowResponse(conversationId, userResponse)

  } else if (userResponse.startsWith('TOPIC-')) {
    const topic = userResponse.slice('TOPIC-'.length);
    const [topicResponse] = botResponses.filter((response) => response.name === topic);

    if (selectedTags) {
      [supportBotResponse] = botResponses.filter((response) => response.uuid === resourceStoryblokId);
      supportBotResponse.content.resources.items = topicResponse.content.resources.items.filter(
        (resource) => selectedTags.map((tag) => tag.text).includes(resource.tag),
      );
      suffixMessages = botResponses.filter((response) => response.uuid === additionalResourcesStoryblokId);
      suffixMessages.push(botResponses.filter((response) => response.uuid === anythingElseStoryblokId)[0]);
    } else {
      topicResponse.radioButtonOptions = topicResponse.content.resources.items.reduce((tags, resource) => {
        if (tags.indexOf(resource.tag) === -1) {
          tags.push(resource.tag);
        }
        return tags;
      }, []).map((tag) => ({ postback: userResponse, text: tag }));

      topicResponse.content.resources = [];
      supportBotResponse = topicResponse;
    }
  } else if (previousMessageStoryblokId === anythingElseStoryblokId && userResponse === 'No') {
    await updateConversationsTableByColumn(
      'stage',
      'feedback',
      conversationId,
    );
    supportBotResponse = await getFeedbackMessage(conversationId);
  } else if (previousMessageStoryblokId === kickoffSupportMessageStoryblokId) {
    if (userResponse === 'Yes') {
      [supportBotResponse] = botResponses.filter((response) => response.uuid === freeTextSupportRequestStoryblokId);
    } else {
      [supportBotResponse] = botResponses.filter((response) => response.uuid === radioButtonSupportRequestStoryblokId);
      supportBotResponse.checkBoxOptions = botResponses.filter(
        (response) => setupMessages.indexOf(response.uuid) < 0,
      ).map(
        (response) => ({ postback: `TOPIC-${response.name}`, text: response.name }),
      );
    }
  } else {
    [supportBotResponse] = botResponses.filter((response) => response.uuid === kickoffSupportMessageStoryblokId);
  }

  return { supportBotResponse, suffixMessages };
};

const getSetupMessage = async (data) => {
  const { previousMessageStoryblokId, conversationId } = data;
  const userResponse = data.speech;
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
    await updateConversationsTableByColumn(
      'stage',
      'support',
      conversationId,
    );
    const supportMessage = await getSupportMessage(data);
    setupBotResponse = supportMessage.supportBotResponse;
  }

  // If someone just asked for a language we don't have tell
  // them we will speak in English
  if (botResponses.filter((response) => response.name === 'new-language')[0].uuid === previousMessageStoryblokId) {
    prefixMessages.concat(botResponses.filter((response) => response.name === 'new-language-submitted')[0].content.speech.items);
  }
  return { setupBotResponse, prefixMessages };
};

exports.getBotMessage = async (req) => {
  const { conversationId } = req;

  const conversationStage = await getConversationStage(conversationId);

  // TODO: REfactor these into one final call to formatBotResponse at end.
  switch (conversationStage) {
    case 'setup': {
      const { setupBotResponse, prefixMessages } = await getSetupMessage(req);
      return formatBotResponse(setupBotResponse, prefixMessages, [], conversationId);
    }
    case 'feedback': {
      const feedbackBotResponse = await getFeedbackMessage(conversationId);
      return formatBotResponse(feedbackBotResponse, [], [], conversationId);
    }
    case 'support': {
      const { supportBotResponse, suffixMessages } = await getSupportMessage(req);
      return formatBotResponse(supportBotResponse, [], suffixMessages, conversationId);
    }
    default:
      // Some error
      return null;
  }
};
