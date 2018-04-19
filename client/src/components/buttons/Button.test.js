/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from './Button';

const uniqueId = '1234';
const options = [{ text: 'test', postback: 'postback' }];
const lang = 'en';
const addMessage = () => {};
const sendMessage = () => {};
const updateLang = () => {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Buttons
    uniqueId={uniqueId}
    options={options}
    addMessage={addMessage}
    sendMessage={sendMessage}
    lang={lang}
    updateLang={updateLang}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
