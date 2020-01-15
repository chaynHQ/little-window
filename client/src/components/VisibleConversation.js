import { connect } from 'react-redux';
import Conversation from './Conversation';
import { fetchBotResponse, addUserInputToStack } from '../actions';


const uuidv4 = require('uuid/v4');

// Check that this isn't creating new Id's all the time.
const uniqueConversationId = uuidv4();


// Pieces of data we want to pass to Conversation
const mapStateToProps = (state) => ({
  messages: state.messages,
});

// Functions we want to pass to Conversation
const mapDispatchToProps = (dispatch) => ({
  sendMessageToBot: (data) => {
    dispatch(fetchBotResponse({ ...data, uniqueConversationId }));
  },
  optionInputHandler: (data) => {
    dispatch(fetchBotResponse({ speech: data.postback, lang: data.lang, uniqueConversationId }));
    dispatch(addUserInputToStack(data.text));
  },
});

const VisibleConversation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Conversation);

export default VisibleConversation;
