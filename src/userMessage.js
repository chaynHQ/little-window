const { DF_KEY } = require('../config');
const apiai = require('apiai');
const saveConversation = require('./database/queries/save_conversation');
const saveMessage = require('./database/queries/save_message');
const googleCall = require('./googleCall');

const app = apiai(DF_KEY);

// the call to Dialog Flow
const apiaiCall = (req, res, speech) => {
  console.log('request', req);
  console.log('speech', speech);
  const requestdf = app.textRequest(speech, {
    sessionId: req.body.uniqueId
  });

  requestdf.language = req.body.lang;

  requestdf.on('response', response => {
    console.log('response', response);
    const { messages } = response.result.fulfillment;
    const data = {
      speech: messages[0].speech,
      options: [],
      resources: [],
      selectOptions: [],
      retrigger: '',
      timedelay: '',
      refresh: ''
    };
    // save message to database
    saveMessage(data.speech, response.sessionId);

    const payload = messages[1] ? messages[1].payload : {};
    // check if refresh exists in payload (it's only in one message)

    console.log('payload', payload);
    if (payload.refresh) {
      data.refresh = payload.refresh;
    }
    // check if timedelay exists (slow, very slow and fast)
    data.timedelay = payload.timedelay ? payload.timedelay : 'fast';
    // check if retrigger exists so next message gets sent without user input
    // (needed to display several messages in a row)
    if (payload.retrigger) {
      data.retrigger = payload.retrigger;
    }
    // check if resources exist and if so do the call to Google Sheets
    if (payload.resources) {
      const { selectedCountries, speech } = req.body;
      const lookupVal = speech || 'Global';
      const resourceLink = selectedCountries || [{ lookup: lookupVal }];
      const promiseArray = googleCall(resourceLink);
      Promise.all(promiseArray)
        .then(resources2dArray => {
          data.resources = [].concat(...resources2dArray);
          res.send(data);
        })
        .catch(() => {
          data.resources = [
            { text: 'Chayn Website', href: 'https://chayn.co' }
          ];
          data.retrigger = '';
          data.speech =
            "Sorry there's a problem getting the information, please check the Chayn website or try again later";
          res.send(data);
        });
      // if no resources then set the right type of buttons
    } else {
      console.log('data', data);
      data.options = payload.options ? [...payload.options] : data.options;
      data.selectOptions = payload.selectOptions
        ? [...payload.selectOptions]
        : data.selectOptions;
      res.send(data);
    }
  });

  requestdf.on('error', () => {
    console.log('error');
    const data = {
      options: [],
      selectOptions: [],
      timedelay: '',
      resources: [{ text: 'Chayn Website', href: 'https://chayn.co' }],
      retrigger: '',
      speech:
        "I'm really sorry but I can't chat right now due to technical problems, please check the Chayn website for any information you are looking for or try again later"
    };
    res.send(data);
  });

  requestdf.end();
};

// if it is the first input from user, save the conversation id in database
const userMessage = (req, res) => {
  const { speech, uniqueId } = req.body;
  if (
    speech === 'Yes, I know what I am looking for today' ||
    speech === "No, I don't know what I am looking for today"
  ) {
    saveConversation(uniqueId);
  }
  saveMessage(speech, uniqueId);
  apiaiCall(req, res, speech);
};

module.exports = userMessage;
