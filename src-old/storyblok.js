const StoryblokClient = require('storyblok-js-client');

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_TOKEN,
});

const version = process.env.CONTENT_PREVIEW_MODE === 'true' ? 'draft' : 'published';

// Make Storyblok change according to the language set

exports.getBotResponsesBySlug = (slug, lang) => Storyblok.get('cdn/stories/', {
  starts_with: lang ? `${lang}/${slug}` : slug,
  version,
}).then((response) => response.data.stories).catch({
  // console.log(error);
});

exports.getBotResponsesByUuid = (uuid) => Storyblok.get(`cdn/stories/${uuid}`, {
  find_by: 'uuid',
  version,
}).then((response) => response.data.story).catch({
  // console.log(error);
});
