import App from './App';

const testApp = new App();
const testObj = {
  speech: 'Hello 👋, I am Little Window - a chat bot to help you get the information you need.',
  options: Array(0),
  resources: Array(0),
  retrigger: 'Welcome follow up',
  json: () => ({ speech: 'hello', uniqueConversationId: '1234', options: [] }),
};

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(() => Promise.resolve(testObj));
});

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

it('sendToServer', async () => {
  const response = await testApp.sendToServer({
    speech: 'hello',
    uniqueConversationId: '1234',
  });
  expect(response).toBe(testObj);
});
