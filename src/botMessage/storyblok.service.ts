import { Injectable } from '@nestjs/common';
const StoryblokClient = require('storyblok-js-client');

@Injectable()
export class StoryblokService {
  constructor() {}

  async getBotResponsesBySlug (slug: string, lang?: string) {
    const Storyblok = new StoryblokClient({
       accessToken: process.env.STORYBLOK_TOKEN,
     });
    const version = process.env.CONTENT_PREVIEW_MODE === 'true' ? 'draft' : 'published';

    return Storyblok.get('cdn/stories/', {
      starts_with: lang ? `${lang}/${slug}` : slug,
      version,
    }).then((response) => { return response.data.stories}).catch((error) =>{
      console.log(error);
    });
  }

}




// const StoryblokClient = require('storyblok-js-client');
//
// const Storyblok = new StoryblokClient({
//   accessToken: process.env.STORYBLOK_TOKEN,
// });
//
// const version = process.env.CONTENT_PREVIEW_MODE === 'true' ? 'draft' : 'published';
//
// // Make Storyblok change according to the language set
//
// exports.getBotResponsesBySlug = (slug, lang) => Storyblok.get('cdn/stories/', {
//   starts_with: lang ? `${lang}/${slug}` : slug,
//   version,
// }).then((response) => response.data.stories).catch({
//   // console.log(error);
// });
