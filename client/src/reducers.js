import { combineReducers } from 'redux';
import { ADD_USER_INPUT } from './actions';

// Need to make this idea based
const initialState = {
  messages: [],
};

const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_USER_INPUT:
      // TODO: Add this to the existing state and make it have the required additional information also
      return [
        ...state,
        action.text,
      ];
    default:
      return state;
  }
};

const littleWindowApp = combineReducers({
  messages,
});

export default littleWindowApp;
