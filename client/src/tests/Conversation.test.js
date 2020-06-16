import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import Conversation from '../components/Conversation';
import ConversationContainer from '../components/ConversationContainer';
import Message from '../components/Message';
import CheckBoxOptionsContainer from '../components/CheckBoxOptionsContainer';
import RadioButtonOptionsContainer from '../components/RadioButtonOptionsContainer';
import Resource from '../components/Resource';
import TextInput from '../components/TextInput';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Conversation with messages', () => {
  const messages = [
    {
      text: 'Lorum Ipsum',
      checkBoxOptions: [{ postback: 'foo', text: 'foo' }],
      sender: 'bot',
      nextUserAction: 'option',
      toDisplay: true,
    },
    {
      text: 'Lorum Ipsum',
      radioButtonOptions: [{ postback: 'foo', text: 'foo' }],
      sender: 'bot',
      nextUserAction: 'option',
      toDisplay: true,
    },
    {
      text: 'Lorum Ipsum',
      checkBoxOptions: [{ postback: 'foo', text: 'foo' }],
      sender: 'user',
      nextUserAction: 'wait',
      toDisplay: true,
    },
    {
      text: 'Lorum Ipsum',
      resources: [{ text: 'foo', link: 'foo' }],
      sender: 'bot',
      nextUserAction: 'input',
      toDisplay: true,
    },
    {
      text: 'Hidden then displayed message',
      sender: 'bot',
      nextUserAction: 'input',
      toDisplay: false,
    },
  ];

  const store = mockStore({ messages, conversation: { conversationId: '1234' }, language: 'en' });
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <ConversationContainer />
      </Provider>,
    );
    store.clearActions();
  });

  it('renders with the right number and type of messages', () => {
    expect(wrapper.find(Message)).toHaveLength(4);
    expect(wrapper.find(CheckBoxOptionsContainer)).toHaveLength(2);
    expect(wrapper.find(RadioButtonOptionsContainer)).toHaveLength(1);
    expect(wrapper.find(Resource)).toHaveLength(1);
    expect(wrapper.find(TextInput)).toHaveLength(1);
  });

  it('component did update sets time out and dispatches correct actions', () => {
    jest.useFakeTimers();
    wrapper.find(Conversation).instance().componentDidUpdate();
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'UPDATE_BOT_MESSAGE',
      data: {
        text: 'Hidden then displayed message',
        sender: 'bot',
        nextUserAction: 'input',
        toDisplay: true,
      },
    }]);
  });
});

describe('Conversation without messages', () => {
  const store = mockStore({
    messages: [], conversation: { conversationId: '1234' }, language: 'en', minimised: true,
  });
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <ConversationContainer />
      </Provider>,
    );
    store.clearActions();
  });

  it('renders with the right number of messages', () => {
    expect(wrapper.find(Message)).toHaveLength(1); // Will always have the dotty message
  });
});

describe('Text Input', () => {
  const messages = [
    {
      text: 'Lorum Ipsum',
      checkBoxOptions: [{ postback: 'foo', text: 'foo' }],
      sender: 'bot',
      nextUserAction: 'option',
      toDisplay: true,
    },
  ];

  const store = mockStore({ messages, conversation: { conversationId: '1234' }, language: 'en' });
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <ConversationContainer />
      </Provider>,
    );
    store.clearActions();
  });
  it('text submit dispatches correct actions', () => {
    wrapper.find(TextInput).find('form').simulate('submit');
    const actions = store.getActions();
    expect(actions).toEqual([{
      text: '',
      type: 'ADD_USER_INPUT',
    }]);
  });
});
