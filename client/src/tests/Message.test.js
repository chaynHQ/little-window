import React from 'react';
import { shallow } from 'enzyme';
import Message from '../components/Message';

it('renders without crashing', () => {
  shallow(<Message text="Lorum Ipsum" sender="user" />);
});
