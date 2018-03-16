const { DF_KEY } = require('../config');
const apiai = require('apiai');
const saveConversation = require('./database/queries/save_conversation');
const saveMessage = require('./database/queries/save_message');
const googleCall = require('./googleCall');

const app = apiai(DF_KEY);

const apiaiCall = (req, res, speech) => {
  const requestdf = app.textRequest(speech, {
    sessionId: req.body.uniqueId,
  });

  requestdf.on('response', (response) => {
    const { messages } = response.result.fulfillment;
    const data = {
      speech: messages[0].speech,
      options: [],
      resources: [],
      selectOptions: [],
      retrigger: '',
      timedelay: '',
    };

    saveMessage(data.speech, response.sessionId);

    const payload = messages[1] ? messages[1].payload : {};

    data.timedelay = payload.timedelay ? payload.timedelay : 'fast';

    if (payload.retrigger) {
      data.retrigger = payload.retrigger;
    }

    if (payload.resources) {
      const { selectedCountries, speech } = req.body;
      const lookupVal = speech || 'Global';
      const resourceLink = selectedCountries || [{ lookup: lookupVal }];
      const promiseArray = googleCall(resourceLink)
      Promise.all(promiseArray)
        .then((resources2dArray) => {
          data.resources = [].concat(...resources2dArray);
          res.send(data);
        })
        .catch(() => {
          data.resources = [{ text: 'Chayn Website', href: 'www.chayn.co' }];
          data.retrigger = '';
          data.speech = "Sorry there's a problem getting the information, please check the Chayn website or try again later";
          res.send(data);
        });
    } else {
      data.options = payload.options ? [...payload.options] : data.options;
      data.selectOptions = payload.selectOptions ? [...payload.selectOptions] : data.selectOptions;
      res.send(data);
    }
  });

  requestdf.on('error', () => {
    const data = {
      options: [],
      selectOptions: [],
      timedelay: '',
      resources: [{ text: 'Chayn Website', href: 'www.chayn.co' }],
      retrigger: '',
      speech: "I'm really sorry but I can't chat right now due to technical problems, please check the Chayn website for any information you are looking for or try again later",
    };
    res.send(data);
  });

  requestdf.end();
};

const userMessage = (req, res) => {
  const { speech, uniqueId } = req.body;
  if (speech === 'Yes, I know what I am looking for today' || speech === 'No, I don\'t know what I am looking for today') {
    saveConversation(uniqueId);
  }
  saveMessage(speech, uniqueId);
  apiaiCall(req, res, speech);
};

module.exports = userMessage;
