/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import littleWindowApp from './reducers';

const store = createStore(
  littleWindowApp,
  applyMiddleware(thunk),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
