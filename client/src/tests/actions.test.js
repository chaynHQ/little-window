import {
  ADD_USER_INPUT,
  ADD_BOT_MESSAGE,
  SET_LANGUAGE,
  UPDATE_BOT_MESSAGE,
  SET_CONVERSATION_DATA,
  REFRESH_CONVERSATION,
  SET_MINIMISE_STATE,
  addUserInputToStack,
  fetchBotResponseSuccess,
  fetchBotResponseFailure,
  updateBotMessage,
  updateConversation,
  refreshConversation,
  setMinimiseState,
  setLanguage
} from '../actions';

describe('actions', () => {
  it('should create an action to add a user input to the stack', () => {
    const text = "Lorum Ipsum"
    const expectedAction = {
      type: ADD_USER_INPUT,
      text
    }

    expect(addUserInputToStack(text)).toEqual(expectedAction)
  });

  it('should create an action to add a user bot to stack on success', () => {
    const data = {}
    const expectedAction = {
      type: ADD_BOT_MESSAGE,
      data
    }
    expect(fetchBotResponseSuccess(data)).toEqual(expectedAction)
  })

  it('should create an action to add a user bot to stack on failure', () => {
    const data = {}
    const expectedAction = {
      type: ADD_BOT_MESSAGE,
      data
    }
    expect(fetchBotResponseFailure(data)).toEqual(expectedAction)
  })

  it('should create an action to update a bot message', () => {
    const data = {}
    const expectedAction = {
      type: UPDATE_BOT_MESSAGE,
      data
    }
    expect(updateBotMessage(data)).toEqual(expectedAction)
  })

  it('should create an action to update the conversation', () => {
    const data = {}
    const expectedAction = {
      type: SET_CONVERSATION_DATA,
      data
    }
    expect(updateConversation(data)).toEqual(expectedAction)
  })

  it('should create an action to refresh the conversation', () => {
    const expectedAction = {
      type: REFRESH_CONVERSATION,
    }
    expect(refreshConversation()).toEqual(expectedAction)
  })

  it('should create an action to minimise the conversation', () => {
    const expectedAction = {
      type: SET_MINIMISE_STATE,
    }
    expect(setMinimiseState()).toEqual(expectedAction)
  })

  it('should create an action to minimise the conversation', () => {
    const lang = "en"
    const expectedAction = {
      type: SET_LANGUAGE,
      lang
    }
    expect(setLanguage(lang)).toEqual(expectedAction)
  })

})
