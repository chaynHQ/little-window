/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import Resources from './Resources';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Resources />, div);
  ReactDOM.unmountComponentAtNode(div);
});
