import React from 'react';
import { shallow } from 'enzyme';
import Conversation from '../components/Conversation';

it('renders without crashing', () => {
  shallow(<Conversation
    inputHandler={() => {return null;}}
    initialBotMessageHandler={() => {return null;}}
    queueNextMessage={() => {return null;}}
    displayedMessages={[]}
    lang="en"
    />);
});
