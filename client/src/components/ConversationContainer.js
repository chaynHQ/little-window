import { connect } from 'react-redux';
import Conversation from './Conversation';
import { fetchBotResponse, addUserInputToStack, setLanguage } from '../actions';

// Check that this isn't creating new Id's all the time.
const uuidv4 = require('uuid/v4');

const uniqueConversationId = uuidv4();

const mapStateToProps = (state) => ({
  messages: state.messages,
  lang: state.language,
});

const mapDispatchToProps = (dispatch) => ({
  initialBotMessageHandler: (data) => {
    dispatch(fetchBotResponse({ ...data, uniqueConversationId }));
  },
  inputHandler: (data, lang) => {
    if (data.lang) {
      dispatch(setLanguage(data.lang));
      dispatch(fetchBotResponse({ speech: data.postback, lang: data.lang, uniqueConversationId }));
    } else {
      dispatch(fetchBotResponse({ speech: data.postback, lang, uniqueConversationId }));
    }
    dispatch(addUserInputToStack(data.text));
  },
});

const mergeProps = (propsFromState, propsFromDispatch) => ({
  ...propsFromState,
  ...propsFromDispatch,
  inputHandler: (data) => propsFromDispatch.inputHandler(data, propsFromState.lang),
});

const ConversationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Conversation);

export default ConversationContainer;
