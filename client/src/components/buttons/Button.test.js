/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from './Button';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Buttons />, div);
  ReactDOM.unmountComponentAtNode(div);
});
