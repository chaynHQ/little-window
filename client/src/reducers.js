import { combineReducers } from 'redux';
import { ADD_USER_INPUT, ADD_BOT_MESSAGE, SET_LANGUAGE } from './actions';

// Need to make this idea based
const initialState = {
  messages: [],
  language: 'en',
};

const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_USER_INPUT:
      // TODO: Add this to the existing state and make it have the required additional information also
      return [
        ...state,
        { text: action.text, type: 'userMessage' },
      ];
    case ADD_BOT_MESSAGE:
      // TODO: Add this to the existing state and make it have the required additional information also
      return [
        ...state,
        { text: action.data.speech, options: action.data.options, type: 'botMessage' },
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
