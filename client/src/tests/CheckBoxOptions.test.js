import React from 'react';
import { shallow } from 'enzyme';
import CheckBoxOptions from '../components/CheckBoxOptions';

it('renders without crashing', () => {
  shallow(<CheckBoxOptions
    inputHandler={() => null}
    options={[]}
  />);
});
