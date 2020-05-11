import React from 'react';
import { shallow } from 'enzyme';
import Conversation from '../components/Conversation';

it('renders without crashing', () => {
  shallow(<Conversation
    inputHandler={() => null}
    initialBotMessageHandler={() => null}
    queueNextMessage={() => null}
    displayedMessages={[]}
    lang="en"
  />);
});
