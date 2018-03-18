/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

const refresh = () => {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header refresh={refresh} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
