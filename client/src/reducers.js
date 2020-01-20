import { combineReducers } from 'redux';
import {
  ADD_USER_INPUT, ADD_BOT_MESSAGE, SET_LANGUAGE, UPDATE_BOT_MESSAGE,
} from './actions';

// Need to make this idea based
const initialState = {
  messages: [],
  language: 'en',
};

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
    case ADD_BOT_MESSAGE:

      let nextUserAction;
      if (action.data.options) {
        nextUserAction = 'option';
      } else {
        nextUserAction = 'input';
      }

      return [
        ...state,
        {
          text: action.data.speech,
          options: action.data.options,
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
    default:
      return state;
  }
};

const language = (state = 'en', action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.lang;
    default:
      return state;
  }
};

const littleWindowApp = combineReducers({
  messages,
  language,
});

export default littleWindowApp;
