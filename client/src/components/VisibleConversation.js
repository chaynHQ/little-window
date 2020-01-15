import { connect } from 'react-redux';
import Conversation from './Conversation';
import { fetchBotResponse, addUserInputToStack, setLanguage } from '../actions';

// Check that this isn't creating new Id's all the time.
const uuidv4 = require('uuid/v4');
const uniqueConversationId = uuidv4();

const optionInputHandler = (dispatch, lang, data) => {
  // If lang exists we are getting a response from the initial language question.
  // Save this in state to be reused.
  if (data.lang) {
    dispatch(setLanguage(data.lang));
    dispatch(fetchBotResponse({ speech: data.postback, lang: data.lang, uniqueConversationId }));
  } else {
    dispatch(fetchBotResponse({ speech: data.postback, lang, uniqueConversationId }));
  }

  dispatch(addUserInputToStack(data.text));
};

const mapStateToProps = (state) => ({
  messages: state.messages,
  lang: state.language,
});

const mapDispatchToProps = (dispatch) => ({
  initialBotMessageHandler: (data) => {
    dispatch(fetchBotResponse({ ...data, uniqueConversationId }));
  },
  optionInputHandler: (lang, data) => {
    optionInputHandler(dispatch, lang, data);
  },
});

const mergeProps = (propsFromState, propsFromDispatch) => ({
  ...propsFromState,
  ...propsFromDispatch,
  optionInputHandler: (data) => propsFromDispatch.optionInputHandler(propsFromState.lang, data),
});

const VisibleConversation = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Conversation);

export default VisibleConversation;
