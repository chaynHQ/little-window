/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from './Button';

const uniqueConversationId = '1234';
const options = [{ text: 'test', postback: 'postback' }];
const lang = 'en';
const addMessage = () => {};
const sendMessage = () => {};
const updateLang = () => {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Buttons
    uniqueConversationId={uniqueConversationId}
    options={options}
    addMessage={addMessage}
    sendMessage={sendMessage}
    lang={lang}
    updateLang={updateLang}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
