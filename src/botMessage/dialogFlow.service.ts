import { Injectable } from '@nestjs/common';
const dialogflow = require('dialogflow'); // eslint-disable-line

let privateKey;
if (process.env.NODE_ENV === 'production'){
  privateKey = JSON.parse(process.env.DIALOGFLOW_PRIVATE_KEY)
} else if (process.env.NODE_ENV === 'travis') {
  privateKey = process.env.DIALOGFLOW_PRIVATE_KEY.replace(/\\n/gm, '\n')
} else {
  privateKey = process.env.DIALOGFLOW_PRIVATE_KEY
}

@Injectable()
export class DialogFlowService {
  async getDialogflowIntent(
    conversationId: string,
    userMessage: string,
  ): Promise<string> {

    const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;
    const config = {
      credentials: {
        'private_key': privateKey,
        'client_email': clientEmail,
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
          text: userMessage,
          languageCode: 'en',
        },
      },
    };

    // Send request and get result
    const dialogFlowResponses = await sessionClient.detectIntent(request);
    return dialogFlowResponses[0].queryResult.intent.displayName;
  }
}
