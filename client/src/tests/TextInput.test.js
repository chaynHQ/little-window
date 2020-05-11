import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '../components/TextInput';

it('renders without crashing', () => {
  shallow(<TextInput
    inputHandler={() => null}
    lang="en"
    status="wait"
  />);
});
