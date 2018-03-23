/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

const refresh = () => { };
const refreshDisabled = false;
const minimise = true;
const minimiseFunc = () => {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header
    minimise={minimise}
    minimiseFunc={minimiseFunc}
    refresh={refresh}
    refreshDisabled={refreshDisabled}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
