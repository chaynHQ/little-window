import { Repository } from 'typeorm';
import { Message } from '../../message/message.entity';

// eslint-disable-next-line
// @ts-ignore
export const messageRepositoryMockFactory: () => MockType<
  Repository<Message>
> = jest.fn(() => ({
  save: jest.fn(() => Promise.resolve({ id: '123456789' })),
  find: jest.fn(() => Promise.resolve([
    {speech: 'foo', conversation_: '12345', previousmessage_: '12345', 'storyblok_id': '1234'},
    {speech: 'foo', conversation_: '12345', previousmessage_: '12345', 'storyblok_id': '1234'}
  ]))
}));

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};
