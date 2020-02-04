import { connect } from 'react-redux';
import Conversation from './Conversation';
import {
  fetchBotResponse,
  addUserInputToStack,
  setLanguage,
  updateBotMessage,
  updateConversation,
} from '../actions';

const uuidv4 = require('uuid/v4');

function addMessageToDisplayList(displayedMessages, hiddenMessages, dispatch) {
  const speed = {
    fast: 1500,
    slow: 5000,
    superslow: 8000,
  };

  const timeDelay = hiddenMessages[0].timeDelay || 'fast';

  setTimeout(() => {
    const updatedMessage = hiddenMessages[0];
    updatedMessage.toDisplay = true;
    dispatch(updateBotMessage(updatedMessage));
  },
  speed[timeDelay]);
}

const mapStateToProps = (state) => ({
  displayedMessages: state.messages.filter((message) => message.toDisplay === true),
  hiddenMessages: state.messages.filter((message) => message.toDisplay === false),
  lang: state.language,
  conversationId: state.conversation.conversationId,
  minimised: state.minimised,
});

const mapDispatchToProps = (dispatch) => ({
  initialBotMessageHandler: (data) => {
    const conversationId = uuidv4();
    dispatch(updateConversation({ conversationId: conversationId }));
    dispatch(fetchBotResponse({ ...data, conversationId }));
  },
  inputHandler: (data, lang, conversationId) => {
    if (data.lang) {
      dispatch(setLanguage(data.lang));
      dispatch(fetchBotResponse({
        speech: data.postback,
        lang: data.lang,
        conversationId,
      }));
    } else {
      dispatch(fetchBotResponse({
        speech: data.postback,
        lang,
        conversationId,
        selectedCountries: data.selectedCountries,
      }));
    }

    data.text.forEach((text) => {
      dispatch(addUserInputToStack(text));
    });
  },
  queueNextMessage: (displayedMessages, hiddenMessages) => {
    if (hiddenMessages.length > 0) {
      addMessageToDisplayList(displayedMessages, hiddenMessages, dispatch);
    }
  },
});

const mergeProps = (propsFromState, propsFromDispatch) => ({
  ...propsFromState,
  ...propsFromDispatch,
  inputHandler: (data) => propsFromDispatch.inputHandler(
    data,
    propsFromState.lang,
    propsFromState.conversationId,
  ),
  queueNextMessage: () => propsFromDispatch.queueNextMessage(
    propsFromState.displayedMessages,
    propsFromState.hiddenMessages,
  ),
});

const ConversationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Conversation);

export default ConversationContainer;
