const dialogflow = require('dialogflow');

exports.getDialogflowResponse = async (conversationId, speech) => {
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
    conversationId,
  );

  // TODO: set language Code
  // The Request
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: speech,
        languageCode: 'en',
      },
    },
  };

  // Send request and get result
  const dialogFlowResponses = await sessionClient.detectIntent(request);
  return dialogFlowResponses[0].queryResult.intent.displayName;
};
