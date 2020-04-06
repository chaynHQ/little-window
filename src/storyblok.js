const StoryblokClient = require('storyblok-js-client');

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_TOKEN,
});

// Make Storyblok change according to the language set

exports.getBotResponsesBySlug = (slug) => Storyblok.get('cdn/stories/', {
  starts_with: slug,
}).then((response) => response.data.stories).catch((error) => {
  console.log(error);
});

exports.getBotResponsesByUuid = (uuid) => Storyblok.get(`cdn/stories/${uuid}`, {
  find_by: 'uuid',
}).then((response) => response.data.story).catch((error) => {
  console.log(error);
});
