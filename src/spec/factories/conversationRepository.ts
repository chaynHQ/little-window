import { Repository } from 'typeorm';
import { Conversation } from '../../conversation/conversation.entity';

// eslint-disable-next-line
// @ts-ignore
export const conversationRepositoryMockFactory: () => MockType<Repository<Conversation>> = jest.fn(() => ({
  save: jest.fn(() => Promise.resolve({id:'123456789'})),
  findOne: jest.fn(() => Promise.resolve({
      id: '6595164b-8546-4193-8836-64294221a4e0',
      gdpr: null,
      language: null,
      stage: 'setup',
      'time_created': '2020-04-27T09:05:13.834Z'
    }))
}));

export type MockType<T> = {
 [P in keyof T]: jest.Mock<{}>;
};
