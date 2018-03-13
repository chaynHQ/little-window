const { DF_KEY, GOOGLE_API_1, GOOGLE_API_2 } = require('../config');
const apiai = require('apiai');
const request = require('request-promise');
const saveConversation = require('./database/queries/save_conversation');
const saveMessage = require('./database/queries/save_message');
const gSheetLookup = require('./googleSheetRef');

const app = apiai(DF_KEY);

const getResource = (countryObj) => {
  const cellRef = gSheetLookup[countryObj.lookup];
  const url = GOOGLE_API_1 + cellRef + GOOGLE_API_2;

  return request(url)
    .then((body) => {
      const resourceArray = JSON.parse(body).values.map((resource) => {
        const singleResourceArray = resource.map((str, index, array) => {
          if (index % 2 === 1) return null;
          return { text: array[index], href: array[index + 1] };
        });

        return singleResourceArray.filter(Boolean);
      });
      return [].concat(...resourceArray);
    });
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
      selectedCountries = selectedCountries || [{ lookup: 'Global' }];

      const promiseArray = selectedCountries.map(async (countryObj) => {
        const resource = await getResource(countryObj);
        return resource;
      });

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
  const { speech } = req.body;
  apiaiCall(req, res, speech);
  saveConversation(req.body.uniqueId);
};

module.exports = userMessage;
