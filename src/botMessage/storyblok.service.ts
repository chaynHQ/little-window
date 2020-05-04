import { Injectable } from '@nestjs/common';
const StoryblokClient = require('storyblok-js-client'); // eslint-disable-line

@Injectable()
export class StoryblokService {
  async getBotResponsesBySlug(
    slug: string,
    lang?: string,
  ): Promise<Array<{ slug; name; speech; uuid; radioButtonOptions; content;}>> {
    const Storyblok = new StoryblokClient({
      accessToken: process.env.STORYBLOK_TOKEN,
    });
    const version =
      process.env.CONTENT_PREVIEW_MODE === 'true' ? 'draft' : 'published';

    try {
      const responses = await Storyblok.get('cdn/stories/', {
        'starts_with': lang ? `${lang}/${slug}` : slug,
        version,
      });

      return responses.data.stories;
    } catch (err) {
      throw err;
    }
  }
}
