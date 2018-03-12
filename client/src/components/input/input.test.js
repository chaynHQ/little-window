/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Input />, div);
  ReactDOM.unmountComponentAtNode(div);
});
