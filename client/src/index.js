/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import littleWindowApp from './reducers';

const store = createStore(littleWindowApp);

// toDO: I think we can move these unique generators to not be passed around so much!
// Dialog Flow requires a unique id for every conversation.  We generate it
// here and then pass it down
const uuidv4 = require('uuid/v4');

const uniqueConversationId = uuidv4();
const uniqueIdGenerator = () => uuidv4();

ReactDOM.render(
  <Provider store={store}>
    <App uniqueConversationId={uniqueConversationId} uniqueIdGenerator={uniqueIdGenerator} />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
