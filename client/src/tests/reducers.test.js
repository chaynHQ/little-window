import littleWindowApp from '../reducers.js';

import {
  ADD_USER_INPUT,
  ADD_BOT_MESSAGE,
  SET_LANGUAGE,
  UPDATE_BOT_MESSAGE,
  SET_CONVERSATION_DATA,
  REFRESH_CONVERSATION,
  SET_MINIMISE_STATE,
} from '../actions';

describe('messages reducer', () => {
  it('should return the initial state', () => {
    expect(littleWindowApp(undefined, {}).messages).toEqual([]);
  });


  const firstUserMessage = {
    text: 'First user message',
    sender: 'user',
    nextUserAction: 'wait',
    toDisplay: true,
  };

  const secondUserMessage = {
    text: 'Second user message',
    sender: 'user',
    nextUserAction: 'wait',
    toDisplay: true,
  };


  it('should handle ADD_USER_INPUT', () => {
    expect(
      littleWindowApp({ messages: [] }, {
        type: ADD_USER_INPUT,
        text: 'First user message',
      }).messages,
    ).toEqual([
      firstUserMessage,
    ]);

    expect(
      littleWindowApp({
        messages:
        [firstUserMessage],
      },
      {
        type: ADD_USER_INPUT,
        text: 'Second user message',
      }).messages,
    ).toEqual([firstUserMessage, secondUserMessage]);
  });

  it('should handle ADD_BOT_MESSAGE', () => {
    const botMessageWithInput = [{
      conversationId: '1234',
      speech: 'First bot Message',
      storyblokId: '1234',
    }];

    const botMessageWithInputAndResources = [{
      conversationId: '1234',
      speech: 'First bot Message',
      storyblokId: '1234',
    },
    {
      conversationId: '1234',
      speech: ' Bot Message with resources',
      storyblokId: '1234',
      resources: [],
    },
    ];

    const botMessageWithCheckBoxOptions = [{
      conversationId: '1234',
      speech: 'First bot Message',
      storyblokId: '1234',
      checkBoxOptions: [{}, {}],
    }];

    const botMessageWithRadioButtonOptions = [{
      conversationId: '1234',
      speech: 'First bot Message',
      storyblokId: '1234',
      radioButtonOptions: [{}, {}],
    }];

    const botMessageWithEndOfConversation = [{
      conversationId: '1234',
      speech: 'First bot Message',
      storyblokId: '1234',
      endOfConversation: true,
    }];

    expect(
      littleWindowApp({ messages: [] }, {
        type: ADD_BOT_MESSAGE,
        data: botMessageWithInput,
      }).messages,
    ).toEqual([{
      text: botMessageWithInput[0].speech,
      previousMessageStoryblokId: botMessageWithInput[0].storyblokId,
      previousMessageId: botMessageWithInput[0].messageId,
      sender: 'bot',
      nextUserAction: 'input',
      toDisplay: false,
    }]);

    expect(
      littleWindowApp({ messages: [] },
        {
          type: ADD_BOT_MESSAGE,
          data: botMessageWithInputAndResources,
        }).messages,
    ).toEqual([{
      text: botMessageWithInputAndResources[0].speech,
      previousMessageStoryblokId: botMessageWithInputAndResources[0].storyblokId,
      previousMessageId: botMessageWithInputAndResources[0].messageId,
      sender: 'bot',
      nextUserAction: 'wait',
      toDisplay: false,
    }, {
      text: botMessageWithInputAndResources[1].speech,
      resources: botMessageWithInputAndResources[1].resources,
      previousMessageStoryblokId: botMessageWithInputAndResources[1].storyblokId,
      previousMessageId: botMessageWithInputAndResources[1].messageId,
      sender: 'bot',
      nextUserAction: 'input',
      toDisplay: false,
    }]);

    expect(
      littleWindowApp({ messages: [] },
        {
          type: ADD_BOT_MESSAGE,
          data: botMessageWithRadioButtonOptions,
        }).messages,
    ).toEqual([{
      text: botMessageWithRadioButtonOptions[0].speech,
      previousMessageStoryblokId: botMessageWithRadioButtonOptions[0].storyblokId,
      previousMessageId: botMessageWithRadioButtonOptions[0].messageId,
      radioButtonOptions: botMessageWithRadioButtonOptions[0].radioButtonOptions,
      checkBoxOptions: undefined,
      resources: undefined,
      sender: 'bot',
      nextUserAction: 'option',
      toDisplay: false,
      timeDelay: undefined,
    }]);

    expect(
      littleWindowApp({ messages: [] },
        {
          type: ADD_BOT_MESSAGE,
          data: botMessageWithCheckBoxOptions,
        }).messages,
    ).toEqual([{
      text: botMessageWithCheckBoxOptions[0].speech,
      previousMessageStoryblokId: botMessageWithCheckBoxOptions[0].storyblokId,
      previousMessageId: botMessageWithCheckBoxOptions[0].messageId,
      checkBoxOptions: botMessageWithCheckBoxOptions[0].checkBoxOptions,
      resources: undefined,
      radioButtonOptions: undefined,
      timeDelay: undefined,
      sender: 'bot',
      nextUserAction: 'option',
      toDisplay: false,
    }]);

    expect(
      littleWindowApp({ messages: [] },
        {
          type: ADD_BOT_MESSAGE,
          data: botMessageWithEndOfConversation,
        }).messages,
    ).toEqual([{
      text: botMessageWithEndOfConversation[0].speech,
      previousMessageStoryblokId: botMessageWithEndOfConversation[0].storyblokId,
      previousMessageId: botMessageWithEndOfConversation[0].messageId,
      checkBoxOptions: undefined,
      resources: undefined,
      radioButtonOptions: undefined,
      timeDelay: undefined,
      sender: 'bot',
      nextUserAction: 'none',
      toDisplay: false,
    }]);
  });

  it('should handle UPDATE_BOT_MESSAGE', () => {
    expect(
      littleWindowApp({
        messages: [{
          checkBoxOptions: [],
          hasBeenAnswered: true,
          nextUserAction: 'option',
          previousMessageId: undefined,
          previousMessageStoryblokId: '1234',
          radioButtonOptions: [],
          resources: [],
          sender: 'bot',
          text: 'Something',
          timeDelay: undefined,
          toDisplay: true,
        }],
      }, {
        type: UPDATE_BOT_MESSAGE,
        data: {
          checkBoxOptions: [],
          hasBeenAnswered: true,
          nextUserAction: 'option',
          previousMessageId: undefined,
          previousMessageStoryblokId: '1234',
          radioButtonOptions: [],
          resources: [],
          sender: 'bot',
          text: 'Something',
          timeDelay: undefined,
          toDisplay: true,
        },
      }).messages,
    ).toEqual([
      {
        checkBoxOptions: [],
        hasBeenAnswered: true,
        nextUserAction: 'option',
        previousMessageId: undefined,
        previousMessageStoryblokId: '1234',
        radioButtonOptions: [],
        resources: [],
        sender: 'bot',
        text: 'Something',
        timeDelay: undefined,
        toDisplay: true,
      },
    ]);
  });

  it('should handle REFRESH_CONVERSATION', () => {
    expect(
      littleWindowApp({ messages: [firstUserMessage, secondUserMessage] }, { type: REFRESH_CONVERSATION }).messages,
    ).toEqual([]);
  });
});


describe('language reducer', () => {
  it('should return the initial state', () => {
    expect(littleWindowApp(undefined, {}).language).toEqual('en');
  });

  it('should handle REFRESH_CONVERSATION', () => {
    expect(
      littleWindowApp({ language: "en"}, { type: REFRESH_CONVERSATION }).language,
    ).toEqual('en');
  });

  it('should handle REFRESH_CONVERSATION', () => {
    expect(
      littleWindowApp({ language: null}, { type: SET_LANGUAGE, lang: 'None' }).language,
    ).toEqual('en');
  });

  it('should handle SET_LANGUAGE', () => {
    expect(
      littleWindowApp({language: null}, { type: SET_LANGUAGE, lang: 'fr' }).language,
    ).toEqual('fr');
  });
})

describe('conversation reducer', () => {
  it('should return the initial state', () => {
    expect(littleWindowApp(undefined, {}).conversation).toEqual({});
  });

  it('should handle REFRESH_CONVERSATION', () => {
    expect(
      littleWindowApp({conversation:{ conversationId: '1234'}}, { type: REFRESH_CONVERSATION }).conversation,
    ).toEqual({});
  });

  it('should handle SET_CONVERSATION_DATA', () => {
    expect(
      littleWindowApp({conversation: null}, { type: SET_CONVERSATION_DATA, data: {conversationId: '1234'}}).conversation,
    ).toEqual({conversationId: '1234'});
  });
})

describe('minimised reducer', () => {
  it('should return the initial state', () => {
    expect(littleWindowApp(undefined, {}).minimised).toEqual(false);
  });

  it('should handle SET_MINIMISE_STATE', () => {
    expect(
      littleWindowApp({minimised: true}, { type: SET_MINIMISE_STATE }).minimised,
    ).toEqual(false);
    expect(
      littleWindowApp({minimised: false}, { type: SET_MINIMISE_STATE }).minimised,
    ).toEqual(true);
  });
})
