/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import SelectOptions from './SelectOptions';

const selectOptions = [{ text: 'text', postback: 'postback' }];
const addMessage = () => {};
const sendMessage = () => {};
const uniqueId = 'test';
const lang = 'en';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <SelectOptions
      selectOptions={selectOptions}
      addMessage={addMessage}
      sendMessage={sendMessage}
      uniqueId={uniqueId}
      lang={lang}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
