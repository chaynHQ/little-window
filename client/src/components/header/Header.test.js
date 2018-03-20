/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

const refresh = () => { };
const refreshDisabled = () => { };

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header
    refresh={refresh}
    refreshDisabled={refreshDisabled}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
