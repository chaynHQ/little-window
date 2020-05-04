import { combineReducers } from 'redux';
import { isMobile } from 'react-device-detect';
import {
  ADD_USER_INPUT,
  ADD_BOT_MESSAGE,
  SET_LANGUAGE,
  UPDATE_BOT_MESSAGE,
  SET_CONVERSATION_DATA,
  REFRESH_CONVERSATION,
  SET_MINIMISE_STATE,
} from './actions';


const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_USER_INPUT:
      return [
        ...state,
        {
          text: action.text,
          sender: 'user',
          nextUserAction: 'wait',
          toDisplay: true,
        },
      ];
    case ADD_BOT_MESSAGE: {
      const {
        timedelay,
      } = action.data;
      const newMessages = action.data.map((item, i, arr) => {
        // TODO: Do we use the sender or timeDelay element anymore?
        // TODO: THESE SHOULDN'T BE LABELLED AS PREVIOUSMESS etc...
        let message = {
          text: item.speech,
          resources: item.resources,
          previousMessageStoryblokId: item.storyblokId,
          previousMessageId: item.messageId,
          sender: 'bot',
          nextUserAction: 'wait',
          toDisplay: false,
          timeDelay: timedelay,
        };
        if (arr.length - 1 === i) {
          let nextUserAction = 'input';
          if ((item.checkBoxOptions && item.checkBoxOptions.length) || (item.radioButtonOptions && item.radioButtonOptions.length) ){
            nextUserAction = 'option'
          } else if (item.endOfConversation === true){
            nextUserAction = 'none';
          }
          message = {
            ...message,
            nextUserAction: nextUserAction,
            checkBoxOptions: item.checkBoxOptions,
            radioButtonOptions: item.radioButtonOptions,
          };
        }
        return message;
      });
      return [...state, ...newMessages];
    }
    case UPDATE_BOT_MESSAGE:
      return [
        ...state,
      ];
    case REFRESH_CONVERSATION:
      return [];
    default:
      return state;
  }
};

const language = (state = 'en', action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.lang;
    case REFRESH_CONVERSATION:
      return 'en';
    default:
      return state;
  }
};

const conversation = (state = {}, action) => {
  switch (action.type) {
    case SET_CONVERSATION_DATA:
      return action.data;
    case REFRESH_CONVERSATION:
      return {};
    default:
      return state;
  }
};

const minimised = (state = isMobile, action) => {
  switch (action.type) {
    case SET_MINIMISE_STATE:
      return !state;
    default:
      return state;
  }
};
const littleWindowApp = combineReducers({
  messages,
  language,
  conversation,
  minimised,
});

export default littleWindowApp;
