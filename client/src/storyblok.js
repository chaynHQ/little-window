const StoryblokClient = require('storyblok-js-client');

const Storyblok = new StoryblokClient({
  accessToken: process.env.REACT_APP_STORYBLOK_TOKEN,
});

async function getNewConversationMessage() {
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
}

export default getNewConversationMessage;
