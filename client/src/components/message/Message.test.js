/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';

const messageObj = {
  isUser: true,
  options: [{ text: 'test', postback: 'postback' }],
  resources: [{ text: 'test', href: 'href' }],
  selectOptions: [{ text: 'test', postback: 'postback' }],
  speech: 'test',
};

const addMessage = () => {};
const sendMessage = () => {};
const uniqueId = '1234';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Message
    addMessage={addMessage}
    sendMessage={sendMessage}
    messageObj={messageObj}
    uniqueId={uniqueId}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
