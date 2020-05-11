import { Test, TestingModule } from '@nestjs/testing';
import { StoryblokService } from '../botMessage/storyblok.service';

describe('StoryblokService', () => {
  let storyblokService: StoryblokService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [StoryblokService],
    }).compile();
    storyblokService = app.get<StoryblokService>(StoryblokService);
  });

  describe('getBotResponsesBySlug', () => {
    test('should return an array', () => {
      return storyblokService.getBotResponsesBySlug('setup').then(data => {
        expect(Array.isArray(data)).toBe(true);
      });
    });
  });
});
