import { Injectable, HttpService  } from '@nestjs/common';
import { StoryblokService } from '../botMessage/storyblok.service';
import { ConversationService } from '../conversation/conversation.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UserMessageService {
  constructor(
    private conversationService: ConversationService,
    private storyblokService: StoryblokService,
    private httpService: HttpService
  ) {}

  setupConversation = async (
    userResponse,
    conversationId,
    previousMessageStoryblokId,
    userIpAddress
  ): Promise<void> => {
    // TODO: Can we do something nice with the getBotResponsesBySlug
    // so we don't have to filter afterwards.
    const splitUserResponse = userResponse.split('-');
    const botResponses = await this.storyblokService.getBotResponsesBySlug(
      'setup',
    );

    const previousMessageWasSetupMessage =
      botResponses.some(
        response => response['uuid'] === previousMessageStoryblokId,
      );

    if (previousMessageWasSetupMessage) {
      const isFormattedLikeSetupAnswer =
        splitUserResponse.length === 3 && splitUserResponse[0] === 'SETUP';

      const column = splitUserResponse[1];
      let value = splitUserResponse[2];

      if (isFormattedLikeSetupAnswer) {
        if (column === 'gdpr') {
          try {
            value = JSON.parse(splitUserResponse[2]);
          } catch (e) {
            return;
          }

          if (value === true){
            const location = await this.httpService.get("http://ip-api.com/json/" + userIpAddress).pipe(map(response => response.data)).toPromise();
            await this.conversationService.update('city', location.city, conversationId);
            await this.conversationService.update('country', location.regionName, conversationId);
          }

        } else if (column === 'language' && value === 'None'){
          return;
        }

        await this.conversationService.update(column, value, conversationId);

      } else if (
        botResponses.filter(response => response['name'] === 'new-language')[0][
          'uuid'
        ] === previousMessageStoryblokId
      ) {
        await this.conversationService.update('language', 'en', conversationId);
      }
    }
  };
}
