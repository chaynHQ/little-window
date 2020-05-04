import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserMessageDto } from '../userMessage/userMessage.dto';
import { ConversationService } from '../conversation/conversation.service';
import { StoryblokService } from './storyblok.service';
import { BotMessageDto } from './botMessage.dto';
import { MessageService } from '../message/message.service';
import { DialogFlowService } from './dialogFlow.service';

@Injectable()
export class BotMessageService {
  constructor(
    @Inject(forwardRef(() => ConversationService))
    private conversationService: ConversationService,
    private storyblokService: StoryblokService,
    private messageService: MessageService,
    private dialogFlowService: DialogFlowService,
  ) {}

  async getBotResponse(
    userMessageDto: UserMessageDto,
  ): Promise<Array<BotMessageDto>> {
    const conversationId: string = userMessageDto.conversationId;

    const conversationData = await this.conversationService.get(conversationId);

    const conversationStage = conversationData.stage;

    // TODO: Refactor these into one final call to formatBotResponse at end.
    switch (conversationStage) {
      case 'setup': {
        const { setupBotResponse, prefixMessages } = await this.getSetupMessage(
          {
            ...userMessageDto,
            language: conversationData.language,
          },
        );
        return this.formatBotResponse(
          setupBotResponse,
          prefixMessages,
          [],
          conversationId,
        );
      }
      case 'feedback': {
        const feedbackBotResponse = await this.getFeedbackMessage({
          ...userMessageDto,
          language: conversationData.language,
        });
        return this.formatBotResponse(
          feedbackBotResponse,
          [],
          [],
          conversationId,
        );
      }
      case 'support': {
        const {
          supportBotResponse,
          suffixMessages,
        } = await this.getSupportMessage({
          ...userMessageDto,
          language: conversationData.language,
        });
        return this.formatBotResponse(
          supportBotResponse,
          [],
          suffixMessages,
          conversationId,
        );
      }
      default:
        throw conversationStage + ' is not a recognised conversation stage.';
        return null;
    }
  }

  formatBotResponse(
    response,
    prefixMessages,
    suffixMessages,
    conversationId: string,
  ): Array<BotMessageDto> {
    // Check that response isn't empty
    const formattedResponse = [];
    if (!response) {
      //TODO: Throw error rather than return
      return [
        {
          speech:
            'Something went wrong. My team have been notified and are trying to fix the issue',
          conversationId: conversationId,
        },
      ];
    }

    [...prefixMessages, response, ...suffixMessages].forEach(
      (messageGroup, i, arr) => {
        messageGroup.content.speech.items.forEach(message => {
          const newMessage = {};
          newMessage['conversationId'] = conversationId;
          newMessage['storyblokId'] = messageGroup.uuid;
          newMessage['speech'] = message;
          newMessage['resources'] = messageGroup.content.resources
            ? messageGroup.content.resources.items
            : [];

          if (arr.length - 1 === i) {
            if (messageGroup.checkBoxOptions) {
              newMessage['checkBoxOptions'] = messageGroup.checkBoxOptions;
            } else if (messageGroup.content.checkBoxOptions) {
              newMessage['checkBoxOptions'] =
                messageGroup.content.checkBoxOptions;
            } else {
              newMessage['checkBoxOptions'] = [];
            }
            if (messageGroup.radioButtonOptions) {
              newMessage['radioButtonOptions'] =
                messageGroup.radioButtonOptions;
            } else if (messageGroup.content.radioButtonOptions) {
              newMessage['radioButtonOptions'] =
                messageGroup.content.radioButtonOptions;
            } else {
              newMessage['radioButtonOptions'] = [];
            }
          }
          formattedResponse.push(newMessage);
        });
      },
    );
    return formattedResponse;
  }

  getFeedbackMessage = async (data): Promise<{}> => {
    const conversationId = data.conversationId;
    // Get all the bot responses
    const botResponses = await this.storyblokService.getBotResponsesBySlug(
      'feedback',
      data.language,
    );

    // Sort bot responses
    botResponses.sort((a, b) => {
      if (a.slug < b.slug) {
        return -1;
      }
      if (a.slug > b.slug) {
        return 1;
      }
      return 0;
    });

    // Get all the user messages by convo id
    const userMessages = await this.messageService.getByConversationId(
      conversationId,
    );

    const feedbackBotResponse = botResponses.find(response => {
      if (
        userMessages.filter(
          userMessage => userMessage['storyblok_id'] === response['uuid'],
        ).length === 0
      ) {
        return true;
      }
      return false;
    });

    return feedbackBotResponse;
  };

  getSupportMessage = async (
    data,
  ): Promise<{ supportBotResponse: object; suffixMessages: object }> => {
    const previousMessageStoryblokId = data.previousMessageStoryblokId;
    const conversationId = data.conversationId;
    const selectedTags = data.selectedTags;
    const userMessage = data.speech;

    const botResponses = await this.storyblokService.getBotResponsesBySlug(
      'support',
      data.language,
    );
    const botTopicResponses = await this.storyblokService.getBotResponsesBySlug(
      'topic',
      data.language,
    );

    const kickoffSupportMessageStoryblokId = process.env.kickoffSupportMessageStoryblokId;
    const freeTextSupportRequestStoryblokId =
      process.env.freeTextSupportRequestStoryblokId;
    const radioButtonSupportRequestStoryblokId = process.env;
    const resourceStoryblokId = process.env.resourceStoryblokId;
    const additionalResourcesStoryblokId =
      process.env.additionalResourcesStoryblokId;
    const anythingElseStoryblokId = process.env.anythingElseStoryblokId;

    let supportBotResponse = {};
    let suffixMessages = [];
    if (previousMessageStoryblokId === freeTextSupportRequestStoryblokId) {
      let dialogFlowResponse = await this.dialogFlowService.getDialogflowIntent(
        conversationId,
        userMessage,
      );
      let topicResponse = {};

      [topicResponse] = botTopicResponses.filter(
        response => response.name === dialogFlowResponse,
      );
      if (!topicResponse) {
        [topicResponse] = botResponses.filter(
          response => response.name === 'Fallback',
        );
        dialogFlowResponse = 'Fallback';
      }

      topicResponse['speech'] = `TOPIC-${dialogFlowResponse}`;
      topicResponse['radioButtonOptions'] = topicResponse[
        'content'
      ].resources.items
        .reduce((tags, resource) => {
          if (tags.indexOf(resource.tag) === -1) {
            tags.push(resource.tag);
          }
          return tags;
        }, [])
        .map(tag => ({ postback: `TOPIC-${dialogFlowResponse}`, text: tag }));

      topicResponse['content'].resources = [];
      supportBotResponse = topicResponse;

      if (
        dialogFlowResponse === 'Emergency' ||
        dialogFlowResponse === 'Fallback'
      ) {
        supportBotResponse[
          'checkBoxOptions'
        ] = botTopicResponses.map(response => ({
          postback: `TOPIC-${response.name}`,
          text: response.name,
        }));
      }
    } else if (userMessage.startsWith('TOPIC-')) {
      const topic = userMessage.slice('TOPIC-'.length);
      const [topicResponse] = botTopicResponses.filter(
        response => response.name === topic,
      );

      if (selectedTags) {
        [supportBotResponse] = botResponses.filter(
          response => response.uuid === resourceStoryblokId,
        );
        supportBotResponse['content'].resources.items = topicResponse[
          'content'
        ].resources.items.filter(resource =>
          selectedTags.map(tag => tag.text).includes(resource.tag),
        );
        suffixMessages = botResponses.filter(
          response => response.uuid === additionalResourcesStoryblokId,
        );
        suffixMessages.push(
          botResponses.filter(
            response => response.uuid === anythingElseStoryblokId,
          )[0],
        );
      } else {
        topicResponse.radioButtonOptions = topicResponse.content.resources.items
          .reduce((tags, resource) => {
            if (tags.indexOf(resource.tag) === -1) {
              tags.push(resource.tag);
            }
            return tags;
          }, [])
          .map(tag => ({ postback: userMessage, text: tag }));

        topicResponse.content.resources = [];
        supportBotResponse = topicResponse;
      }
    } else if (
      previousMessageStoryblokId === anythingElseStoryblokId &&
      userMessage === 'No'
    ) {
      await this.conversationService.update(
        'stage',
        'feedback',
        conversationId,
      );
      supportBotResponse = await this.getFeedbackMessage(conversationId);
    } else if (
      previousMessageStoryblokId === kickoffSupportMessageStoryblokId
    ) {
      if (userMessage === 'Yes') {
        [supportBotResponse] = botResponses.filter(
          response => response.uuid === freeTextSupportRequestStoryblokId,
        );
      } else {
        [supportBotResponse] = botResponses.filter(
          response => response.uuid === radioButtonSupportRequestStoryblokId,
        );
        supportBotResponse[
          'checkBoxOptions'
        ] = botTopicResponses.map(response => ({
          postback: `TOPIC-${response.name}`,
          text: response.name,
        }));
      }
    } else {
      [supportBotResponse] = botResponses.filter(
        response => response.uuid === kickoffSupportMessageStoryblokId,
      );
    }

    return { supportBotResponse, suffixMessages };
  };

  getSetupMessage = async (
    data,
  ): Promise<{ setupBotResponse: object; prefixMessages: object }> => {
    const conversationId = data.conversationId;
    const language = data.language;
    const userMessage = data.speech;
    const previousMessageStoryblokId = data.previousMessageStoryblokId;

    let setupBotResponse = {};
    const prefixMessages = [];

    const [botResponses, isLanguageSet, isGDPRSet] = await Promise.all([
      this.storyblokService.getBotResponsesBySlug('setup', language),
      this.conversationService.get(conversationId, 'language'),
      this.conversationService.get(conversationId, 'gdpr'),
    ]);

    if (isLanguageSet === null) {
      // TODO: Need better checking in place to ensure users can't type this in
      // when they are typing in a general input.
      // Potential solution validate how the input was inputed by the user.
      if (userMessage === 'SETUP-language-None') {
        [setupBotResponse] = botResponses.filter(
          response => response['name'] === 'new-language',
        );
      } else {
        [setupBotResponse] = botResponses.filter(
          response => response['slug'] === 'language',
        );
      }
    } else if (isGDPRSet === null) {
      if (isGDPRSet === 'false') {
        [setupBotResponse] = botResponses.filter(
          response => response['slug'] === 'gdpr-reject',
        );
      } else if (userMessage === 'SETUP-gdpr-more') {
        [setupBotResponse] = botResponses.filter(
          response => response['slug'] === 'gdpr-more',
        );
      } else {
        [setupBotResponse] = botResponses.filter(
          response => response['name'] === 'GDPR',
        );
      }
    } else {
      await this.conversationService.update('stage', 'support', conversationId);
      const supportMessage = await this.getSupportMessage(data);
      setupBotResponse = supportMessage['supportBotResponse'];
    }

    // If someone just asked for a language we don't have tell
    // them we will speak in English
    if (
      botResponses.filter(response => response['name'] === 'new-language')[0] &&
      botResponses.filter(response => response['name'] === 'new-language')[0][
        'uuid'
      ] === previousMessageStoryblokId
    ) {
      prefixMessages.concat(
        botResponses.filter(
          response => response['name'] === 'new-language-submitted',
        )[0]['content'].speech.items,
      );
    }
    return { setupBotResponse, prefixMessages };
  };
}
