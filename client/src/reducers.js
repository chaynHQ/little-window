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
  let nextUserAction;

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
    case ADD_BOT_MESSAGE:
      if (action.data.checkBoxOptions.length > 1 || action.data.radioButtonOptions.length > 1) {
        nextUserAction = 'option';
      } else if (action.data.retrigger) {
        nextUserAction = 'wait';
      } else {
        nextUserAction = 'input';
      }

      return [
        ...state,
        {
          text: action.data.speech,
          checkBoxOptions: [...action.data.checkBoxOptions],
          radioButtonOptions: [...action.data.radioButtonOptions],
          resources: action.data.resources,
          sender: 'bot',
          nextUserAction,
          toDisplay: false,
          timeDelay: action.data.timedelay,
        },
      ];
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
