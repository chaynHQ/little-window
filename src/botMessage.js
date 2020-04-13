const { getBotResponsesBySlug } = require('./storyblok');
const {
  getConversationStage,
  getColumnForConversation,
  getMessagesByColumns,
  updateConversationsTableByColumn,
} = require('./db/db');
const { getDialogflowResponse } = require('./dialogFlow');


// TODO: Reformat this so the response object is a giant array of smaller message objects
// Save each message object separately in the database.
const formatBotResponse = (response, prefixMessages, suffixMessages, conversationId) => {
  // Check that response isn't empty
  const formattedResponse = [];
  if (!response) {
    return [{ speech: 'Something went wrong. My team have been notified and are trying to fix the issue' }];
  }


  [...prefixMessages, response, ...suffixMessages].forEach((messageGroup, i, arr) => {
    messageGroup.content.speech.items.forEach((message) => {
      const newMessage = {};
      newMessage.conversationId = conversationId;
      newMessage.storyblokId = messageGroup.uuid;
      newMessage.speech = message;
      newMessage.resources = messageGroup.content.resources
        ? messageGroup.content.resources.items : [];


      if (arr.length - 1 === i) {
        if (messageGroup.checkBoxOptions) {
          newMessage.checkBoxOptions = messageGroup.checkBoxOptions;
        } else if (messageGroup.content.checkBoxOptions) {
          newMessage.checkBoxOptions = messageGroup.content.checkBoxOptions;
        } else {
          newMessage.checkBoxOptions = [];
        }
        if (messageGroup.radioButtonOptions) {
          newMessage.radioButtonOptions = messageGroup.radioButtonOptions;
        } else if (messageGroup.content.radioButtonOptions) {
          newMessage.radioButtonOptions = messageGroup.content.radioButtonOptions;
        } else {
          newMessage.radioButtonOptions = [];
        }
      }
      formattedResponse.push(newMessage);
    });
  });
  return formattedResponse;
};

const getFeedbackMessage = async (data) => {
  const { conversationId } = data;
  // Get all the bot responses
  const botResponses = await getBotResponsesBySlug('feedback', data.language);
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

  const botResponses = await getBotResponsesBySlug('support', data.language);
  const botTopicResponses = await getBotResponsesBySlug('topic', data.language);

  const { kickoffSupportMessageStoryblokId } = process.env;
  const { freeTextSupportRequestStoryblokId } = process.env;
  const { radioButtonSupportRequestStoryblokId } = process.env;
  const { resourceStoryblokId } = process.env;
  const { additionalResourcesStoryblokId } = process.env;
  const { anythingElseStoryblokId } = process.env;

  let supportBotResponse = {};
  let suffixMessages = [];

  if (previousMessageStoryblokId === freeTextSupportRequestStoryblokId) {
    let dialogFlowResponse = await getDialogflowResponse(conversationId, userResponse);
    let topicResponse = {};

    [topicResponse] = botTopicResponses.filter(
      (response) => response.name === dialogFlowResponse,
    );
    if (!topicResponse) {
      [topicResponse] = botResponses.filter(
        (response) => response.name === 'Fallback',
      );
      dialogFlowResponse = 'Fallback';
    }

    topicResponse.speech = `TOPIC-${dialogFlowResponse}`;
    topicResponse.radioButtonOptions = topicResponse.content.resources.items.reduce(
      (tags, resource) => {
        if (tags.indexOf(resource.tag) === -1) {
          tags.push(resource.tag);
        }
        return tags;
      }, [],
    ).map((tag) => ({ postback: `TOPIC-${dialogFlowResponse}`, text: tag }));

    topicResponse.content.resources = [];
    supportBotResponse = topicResponse;

    if (dialogFlowResponse === 'Emergency' || dialogFlowResponse === 'Fallback') {
      supportBotResponse.checkBoxOptions = botTopicResponses.map(
        (response) => ({ postback: `TOPIC-${response.name}`, text: response.name }),
      );
    }
  } else if (userResponse.startsWith('TOPIC-')) {
    const topic = userResponse.slice('TOPIC-'.length);
    const [topicResponse] = botTopicResponses.filter((response) => response.name === topic);

    if (selectedTags) {
      [supportBotResponse] = botResponses.filter(
        (response) => response.uuid === resourceStoryblokId,
      );
      supportBotResponse.content.resources.items = topicResponse.content.resources.items.filter(
        (resource) => selectedTags.map((tag) => tag.text).includes(resource.tag),
      );
      suffixMessages = botResponses.filter(
        (response) => response.uuid === additionalResourcesStoryblokId,
      );
      suffixMessages.push(botResponses.filter(
        (response) => response.uuid === anythingElseStoryblokId,
      )[0]);
    } else {
      topicResponse.radioButtonOptions = topicResponse.content.resources.items.reduce(
        (tags, resource) => {
          if (tags.indexOf(resource.tag) === -1) {
            tags.push(resource.tag);
          }
          return tags;
        }, [],
      ).map((tag) => ({ postback: userResponse, text: tag }));

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
      [supportBotResponse] = botResponses.filter(
        (response) => response.uuid === freeTextSupportRequestStoryblokId,
      );
    } else {
      [supportBotResponse] = botResponses.filter(
        (response) => response.uuid === radioButtonSupportRequestStoryblokId,
      );
      supportBotResponse.checkBoxOptions = botTopicResponses.map(
        (response) => ({ postback: `TOPIC-${response.name}`, text: response.name }),
      );
    }
  } else {
    [supportBotResponse] = botResponses.filter(
      (response) => response.uuid === kickoffSupportMessageStoryblokId,
    );
  }

  return { supportBotResponse, suffixMessages };
};

const getSetupMessage = async (data) => {
  const { previousMessageStoryblokId, conversationId } = data;
  const userResponse = data.speech;
  let setupBotResponse = {};
  const prefixMessages = [];

  // TODO: Chain all these awaits into a set of tasks
  const botResponses = await getBotResponsesBySlug('setup', data.language);
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
  const conversationLang = await getColumnForConversation('language', conversationId);

  if (conversationLang) {
    req.language = conversationLang;
  }

  // TODO: REfactor these into one final call to formatBotResponse at end.
  switch (conversationStage) {
    case 'setup': {
      const { setupBotResponse, prefixMessages } = await getSetupMessage(req);
      return formatBotResponse(setupBotResponse, prefixMessages, [], conversationId);
    }
    case 'feedback': {
      const feedbackBotResponse = await getFeedbackMessage(req);
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
