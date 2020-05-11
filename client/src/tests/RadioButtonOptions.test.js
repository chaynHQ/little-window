import React from 'react';
import { shallow } from 'enzyme';
import RadioButtonOptions from '../components/RadioButtonOptions';

it('renders without crashing', () => {
  shallow(<RadioButtonOptions
    inputHandler={() => {return null;}}
    radioButtonSelector={() => {return null;}}
    options={[]}
    selectedOptions={[]}
    selectedOptionsText={[]}
    />);
});
