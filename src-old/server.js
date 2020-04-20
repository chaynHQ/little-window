require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const { userMessage, validate } = require('./userMessage');

// Config
app.set('port', process.env.PORT || 3001);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
}

// Routes
app.post('/usermessage', validate(), userMessage);

// Setup
app.listen(app.get('port'), () => {
  // TODO: Proper Logging
  // console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
