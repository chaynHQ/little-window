// eslint-disable-next-line
// @ts-ignore
export const rollbarMockFactory: () => MockType<> = jest.fn(() => ({
  log: jest.fn(() => {
    return null;
  }),
}));

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};
