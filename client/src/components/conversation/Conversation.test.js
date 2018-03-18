/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import Conversation from './Conversation';

const messages = [{
  isUser: true, isWating: true, options: [{ text: 'test', postback: 'test' }], resources: [{ text: 'test', href: 'test' }], speech: 'test',
}];
const addMessage = () => {};
const sendMessage = () => {};
const uniqueId = '1234';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Conversation
    addMessage={addMessage}
    sendMessage={sendMessage}
    uniqueId={uniqueId}
    messages={messages}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
