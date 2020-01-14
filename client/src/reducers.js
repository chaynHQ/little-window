import { combineReducers } from 'redux';
import { ADD_USER_INPUT } from './actions';

// Need to make this idea based
const initialState = [];

const userInput = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_INPUT:
      // TODO: Add this to the existing state and make it have the required additional information also
      return [...action.text];
    default:
      return state;
  }
};

const littleWindowApp = combineReducers({
  userInput,
});

export default littleWindowApp;
