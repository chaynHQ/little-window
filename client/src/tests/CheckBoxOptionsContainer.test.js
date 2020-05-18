import CheckBoxOptionsContainer from '../components/CheckBoxOptionsContainer.js';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import React from 'react';
import CheckBoxOptions from '../components/CheckBoxOptions';


const mockStore = configureMockStore();

const initialState = {
    product: {
        title: 'title',
        description: 'description',
    }
}


describe('CheckBoxOptions', () => {
  const store = mockStore({});
  let wrapper;

  const message = {
    speech:'Lorum Ipsum',
    checkBoxOptions:[{postback: 'foo', text: 'foo'}]
  }

  beforeEach(() => {
      wrapper = mount(
        <CheckBoxOptionsContainer
             key={'1234'}
             message={{...message, hasBeenAnswered: false}}
             inputHandler={()=>{return}}
             store={store}
             />
      );
  });

  it('renders with correct number of options', () => {
     expect(wrapper.find(CheckBoxOptions).find('button')).toHaveLength(1)
  });


  it('calls appropriate actions from option click', () => {
    wrapper.find(CheckBoxOptions).find('button').simulate('click');
    const actions = store.getActions();
    expect(actions).toEqual([ { type: 'UPDATE_BOT_MESSAGE', data: {...message, hasBeenAnswered: true} } ]);
  })

})
