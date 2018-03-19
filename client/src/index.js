/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
const uuidv4 = require('uuid/v4');

const uniqueId = uuidv4();

const uniqueIdGenerator = () => uuidv4();

ReactDOM.render(<App uniqueId={uniqueId} uniqueIdGenerator={uniqueIdGenerator} />, document.getElementById('root'));
registerServiceWorker();
