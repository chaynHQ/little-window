/*
 * action types
 */
export const ADD_USER_INPUT = 'ADD_USER_INPUT';

/*
 * action creators
 */
export function addUserInput(text) {
  return { type: ADD_USER_INPUT, text };
}
