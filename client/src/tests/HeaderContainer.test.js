import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import HeaderContainer from '../components/HeaderContainer';
import Header from '../components/Header';

import getNewConversationMessage from '../storyblok';

jest.mock('../storyblok.js');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Header Minimised', () => {
  let wrapper;
  let store;
  const newConversationMessage = [{
    speech: "Hi there, I'm Little Window. I’m glad you’re here. It took real strength to reach out today.  I'm a confidential chatbot and I'm here to support you.",
  },
  {
    checkBoxOptions: [
      { text: 'English', postback: 'SETUP-language-en' },
      { text: 'Français', postback: 'SETUP-language-fr' },
      { text: 'A different language', postback: 'SETUP-language-None' },
    ],
    speech: 'What language would you like to talk to me in?',
  }];

  beforeEach(() => {
    store = mockStore({ minimised: true });
    wrapper = mount(
      <HeaderContainer
        store={store}
      />,
    );
  });

  it('renders with two buttons when minimised', () => {
    expect(wrapper.find(Header).find('button')).toHaveLength(2);
  });

  it('calls correct actions on minimise click', () => {
    wrapper.find(Header).find('.minimise-button').simulate('click');
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'SET_MINIMISE_STATE' }]);
  });

  it('calls correct actions on minimise keydown', () => {
    wrapper.find(Header).find('.minimise-button').simulate('keyDown');
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'SET_MINIMISE_STATE' }]);
  });

  it('calls correct actions on refresh click', () => {
    wrapper.find(Header).find('.refresh-button').simulate('click');
    getNewConversationMessage.mockResolvedValue(newConversationMessage);
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'REFRESH_CONVERSATION' }]);
  });

  it('calls correct actions on refresh keydown', () => {
    wrapper.find(Header).find('.refresh-button').simulate('keyDown');
    getNewConversationMessage.mockResolvedValue(newConversationMessage);
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'REFRESH_CONVERSATION' }]);
  });
});

describe('Header Not Minimised', () => {
  let wrapper; let
    store;

  beforeEach(() => {
    store = mockStore({ minimised: false });
    wrapper = mount(
      <HeaderContainer
        store={store}
      />,
    );
  });

  it('renders with two buttons when minimised', () => {
    expect(wrapper.find(Header).find('button')).toHaveLength(2);
  });
});
