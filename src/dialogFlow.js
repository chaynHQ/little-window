const dialogflow = require('dialogflow');
const { value } = require('pb-util');

exports.getResponse = async (req) => {
  // Create a new session
  const privateKey = process.env.DIALOGFLOW_PRIVATE_KEY;
  const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;
  const config = {
    credentials: {
      private_key: privateKey,
      client_email: clientEmail,
    },
  };
  const sessionClient = new dialogflow.SessionsClient(config);
  const sessionPath = sessionClient.sessionPath(
    process.env.DIALOGFLOW_PROJECT_ID,
    req.body.conversationId,
  );

  // The Request
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.speech,
        languageCode: req.body.lang,
      },
    },
  };

  // Send request and get result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult.fulfillmentMessages;

  const customPayload = result.find((ele) => ele.message === 'payload').payload.fields;
  // TODO: Take resources to googlesheets

  // TODO: Update responses in dialogflow options to checkBoxOptions
  // TODO: Update responses in dialogflow selectOptions to radioBoxOptions
  const data = {
    speech: result.find((ele) => ele.message === 'text').text.text[0],
    checkBoxOptions: customPayload.options ? value.decode(customPayload.options) : [],
    resources: customPayload.resources ? value.decode(customPayload.resources) : [],
    radioButtonOptions: customPayload.selectOptions ? value.decode(customPayload.selectOptions) : [],
    retrigger: customPayload.retrigger ? value.decode(customPayload.retrigger) : '',
    timedelay: customPayload.timedelay ? value.decode(customPayload.timedelay) : '',
    refresh: customPayload.refresh ? value.decode(customPayload.refresh) : '',
    GDPROptOut: customPayload.GDPROptOut ? value.decode(customPayload.GDPROptOut) : false,
  };
  return data;
};

// the call to Dialog Flow
// const dialogFlow = (req, res, speech) => {
//   // TODO: remove the need for this to be labeled uniqueConversationId
//   // should instead be conversationId or sessionId
//   const requestdf = app.textRequest(speech, {
//     sessionId: req.body.uniqueConversationId || req.body.conversationId || req.body.uniqueId,
//   });
//
//   const selectedLang = req.body.lang;
//   requestdf.language = selectedLang;
//
//   requestdf.on('response', (response) => {
//     const { messages } = response.result.fulfillment;
//     const data = {
//       speech: messages[0].speech,
//       options: [],
//       resources: [],
//       selectOptions: [],
//       retrigger: '',
//       timedelay: '',
//       refresh: '',
//       GDPROptOut: false,
//     };
//     // save message to database
//     saveMessage(data.speech, response.sessionId);
//
//     const payload = messages[1] ? messages[1].payload : {};
//     // check if refresh exists in payload (it's only in one message)
//     if (payload.refresh) {
//       data.refresh = payload.refresh;
//     }
//
//     // check if timedelay exists (slow, very slow and fast)
//     data.timedelay = payload.timedelay ? payload.timedelay : 'fast';
//
//     // check if retrigger exists so next message gets sent without user input
//     // (needed to display several messages in a row)
//     if (payload.retrigger) {
//       data.retrigger = payload.retrigger;
//     }
//
//     // check if GDPROptOut flag has been set (see A_OptOutConfirm in Dialog Flow)
//     if (payload.GDPROptOut) {
//       data.GDPROptOut = true;
//     }
//
//     // TodO: this is a horribly formated response,
//     // selectedCountries is too specific, we need to make it general to radiobuttons
//     // There is no standardised checking on what is being sent back and forth
//     // The postback is attached to each option,
//     // which doesn't make sense in the case of radio buttons
//     // check if resources exist and if so do the call to Google Sheets
//     if (payload.resources) {
//       const { selectedCountries } = req.body;
//       const lookupVal = speech || 'Global';
//       const resourceLink = selectedCountries || [{ lookup: lookupVal }];
//       const promiseArray = googleCall(resourceLink, selectedLang);
//
//       Promise.all(promiseArray)
//         .then((resources2dArray) => {
//           data.resources = [].concat(...resources2dArray);
//           res.send(data);
//         })
//         .catch(() => {
//           data.resources = [
//             { text: 'Chayn Website', href: 'https://chayn.co' },
//           ];
//           data.retrigger = '';
//           data.speech = errResources(selectedLang);
//           res.send(data);
//         });
//       // if no resources then set the right type of buttons
//     } else {
//       data.options = payload.options ? [...payload.options] : data.options;
//       data.selectOptions = payload.selectOptions
//         ? [...payload.selectOptions]
//         : data.selectOptions;
//       res.send(data);
//     }
//   });
//
//   requestdf.on('error', () => {
//     const data = {
//       options: [],
//       selectOptions: [],
//       timedelay: '',
//       resources: [{ text: 'Chayn Website', href: 'https://chayn.co' }],
//       retrigger: '',
//       speech: errTechnical(selectedLang),
//     };
//     res.send(data);
//   });
//
//   requestdf.end();
// };
