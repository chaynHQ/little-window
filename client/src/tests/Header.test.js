import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Header';

it('renders without crashing', () => {
  shallow(<Header
    minimiseHandler={() => {return null;}}
    refreshHandler={() => {return null;}}
    />);
});
