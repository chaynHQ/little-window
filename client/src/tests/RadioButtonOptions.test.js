import React from 'react';
import { shallow } from 'enzyme';
import RadioButtonOptions from '../components/RadioButtonOptions';

it('renders without crashing', () => {
  shallow(<RadioButtonOptions
    inputHandler={() => null}
    radioButtonSelector={() => null}
    options={[]}
    selectedOptions={[]}
    selectedOptionsText={[]}
  />);
});
