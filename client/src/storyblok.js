import Rollbar from 'rollbar';

const StoryblokClient = require('storyblok-js-client');


const RollbarInstance = new Rollbar({ // eslint-disable-line
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.REACT_APP_ROLLBAR_ENV,
  },
  enabled: ('%NODE_ENV%' === 'production'),
});

const Storyblok = new StoryblokClient({
  accessToken: process.env.REACT_APP_STORYBLOK_TOKEN,
});

async function getNewConversationMessage() {
  try {
    const storyblokResponse = await Storyblok.get('cdn/stories/setup/language');
    const storyblokResponseContent = storyblokResponse.data.story;

    const message = [];
    storyblokResponseContent.content.speech.items.forEach((item) => {
      message.push(
        { speech: item, storyblokId: storyblokResponseContent.uuid },
      );
    });

    message[message.length - 1].checkBoxOptions = storyblokResponseContent.content.checkBoxOptions;

    return message;
  } catch (error) {
    throw new Error(error);
  }
}

export default getNewConversationMessage;
