/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';

const addMessage = () => { };
const sendMessage = () => { };
const inputStatus = false;
const inputMessage = 'abcd';
const uniqueConversationId = '1234';
const lang = 'en';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Input
    addMessage={addMessage}
    sendMessage={sendMessage}
    inputStatus={inputStatus}
    inputMessage={inputMessage}
    uniqueConversationId={uniqueConversationId}
    lang={lang}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
