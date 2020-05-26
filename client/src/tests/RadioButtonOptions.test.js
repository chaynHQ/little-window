import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import React from 'react';
import RadioButtonOptions from '../components/RadioButtonOptions';
import RadioButtonOptionsContainer from '../components/RadioButtonOptionsContainer';


const mockStore = configureMockStore();

describe('RadioButtonOptions without selectedAnswers', () => {
  const store = mockStore({});
  let wrapper;

  const message = {
    speech: 'Lorum Ipsum',
    radioButtonOptions: [{ postback: 'foo', text: 'foo' }],
  };

  beforeEach(() => {
    wrapper = mount(
      <RadioButtonOptionsContainer
        key="1234"
        message={{ ...message, hasSelectedAnswers: false }}
        inputHandler={() => {}}
        store={store}
      />,
    );
  });

  it('renders with correct number of options', () => {
    expect(wrapper.find(RadioButtonOptions).find('button')).toHaveLength(2);
  });

  it('allows us to select answers', () => {
    wrapper.find(RadioButtonOptions).find('.radio-button-option').first().simulate('click');
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'UPDATE_BOT_MESSAGE', data: { ...message, hasSelectedAnswers: true } }]);
  });
});

describe('RadioButtonOptions with selectedAnswers', () => {
  const store = mockStore({});
  let wrapper;

  const message = {
    speech: 'Lorum Ipsum',
    radioButtonOptions: [{ postback: 'bar', text: 'bar', selected: false }, { postback: 'foo', text: 'foo', selected: true }],
  };

  beforeEach(() => {
    wrapper = mount(
      <RadioButtonOptionsContainer
        key="1234"
        message={{ ...message, hasSelectedAnswers: true }}
        inputHandler={() => {}}
        store={store}
      />,
    );
  });

  it('renders with correct number of options', () => {
    expect(wrapper.find(RadioButtonOptions).find('button')).toHaveLength(3);
  });

  it('submits correctly', () => {
    wrapper.find(RadioButtonOptions).find('.radio-button-submit').simulate('click');
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'UPDATE_BOT_MESSAGE', data: { ...message, hasSelectedAnswers: true, hasBeenAnswered: true } }]);
  });
});
