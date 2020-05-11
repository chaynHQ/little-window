import React from 'react';
import { shallow } from 'enzyme';
import Resource from '../components/Resource';

it('renders without crashing', () => {
  shallow(<Resource text="Lorum Ipsum" lang="en" link="chayn.co" />);
});
