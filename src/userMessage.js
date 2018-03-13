const { DF_KEY, GOOGLE_API_1, GOOGLE_API_2 } = require('../config');
const apiai = require('apiai');
const request = require('request');
const saveConversation = require('./database/queries/save_conversation');
const saveMessage = require('./database/queries/save_message');

const app = apiai(DF_KEY);

const gSheetLookup = {
  India: {
    start: 'A2',
    end: 'B',
  },
  Pakistan: {
    start: 'C2',
    end: 'D',
  },
  Italy: {
    start: 'E2',
    end: 'F',
  },
  UK: {
    start: 'G2',
    end: 'H',
  },
  Global: {
    start: 'I2',
    end: 'J',
  },
};

const getAndSendGSheetResources = (res, data, url) => {
  const newData = Object.assign({}, data);
  request(url, (err, gsres, body) => {
    const resourceArray = JSON.parse(body).values.map((resource) => {
      const singleResourceArray = resource.map((str, index, array) => {
        if (index % 2 === 1) return null;
        return { text: array[index], href: array[index + 1] };
      });

      return singleResourceArray.filter(Boolean);
    });
    newData.resources = [].concat(...resourceArray);
    res.send(newData);
  });
};

const findCellRef = (selectedCountries) => {
  const { start } = gSheetLookup[selectedCountries[0].text];
  const { end } = gSheetLookup[selectedCountries[selectedCountries.length - 1].text];

  return `${start}:${end}`;
};

const apiaiCall = (req, res, speech) => {
  saveMessage(speech, req.body.uniqueId);
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
      let { selectedCountries } = req.body;
      selectedCountries = selectedCountries || [{ text: 'Global' }];
      const cellRef = findCellRef(selectedCountries);
      const url = GOOGLE_API_1 + cellRef + GOOGLE_API_2;
      getAndSendGSheetResources(res, data, url);
    } else {
      data.options = payload.options ? [...payload.options] : data.options;
      data.selectOptions = payload.selectOptions ? [...payload.selectOptions] : data.selectOptions;
      res.send(data);
    }
  });

  requestdf.on('error', (error) => {
    console.log(error);
  });

  requestdf.end();
};

const userMessage = (req, res) => {
  const { speech } = req.body;
  apiaiCall(req, res, speech);
  saveConversation(req.body.uniqueId);
};

module.exports = userMessage;
