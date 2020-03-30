const dialogflow = require('dialogflow');
const { value } = require('pb-util');
const { getResources } = require('./googleSheets');

exports.getResponse = async (req, res) => {
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
  const dialogFlowResponses = await sessionClient.detectIntent(request);
  const result = dialogFlowResponses[0].queryResult.fulfillmentMessages;

  // Turn result into reponse

  let data = {
    speech: result.find((ele) => ele.message === 'text').text.text[0],
  };

  if (result.find((ele) => ele.message === 'payload')) {
    const customPayload = result.find((ele) => ele.message === 'payload').payload.fields;

    // TODO: Update responses in dialogflow options to checkBoxOptions
    // TODO: Update responses in dialogflow selectOptions to radioBoxOptions
    data = {
      ...data,
      checkBoxOptions: customPayload.options ? value.decode(customPayload.options) : [],
      radioButtonOptions: customPayload.selectOptions
        ? value.decode(customPayload.selectOptions) : [],
      retrigger: customPayload.retrigger ? value.decode(customPayload.retrigger) : '',
      timedelay: customPayload.timedelay ? value.decode(customPayload.timedelay) : '',
      refresh: customPayload.refresh ? value.decode(customPayload.refresh) : '',
      GDPROptOut: customPayload.GDPROptOut ? value.decode(customPayload.GDPROptOut) : false,
    };

    if (customPayload.resources && value.decode(customPayload.resources) === true) {
      const lookupVals = req.body.selectedCountries
        ? req.body.selectedCountries.map((country) => country.lookup)
        : [req.body.speech];
      const resources = await getResources(lookupVals, req.body.lang);
      if (resources.length > 0) {
        data.resources = resources;
      } else {
        return res.status(422).json({
          errors: [{
            value: null,
            msg: 'problem retrieving resources',
          }],
        });
      }
    }
  }

  return data;
};
