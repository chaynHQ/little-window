import React from 'react';
import ReactDOM from 'react-dom';
import Resources from './index';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Resources />, div);
    ReactDOM.unmountComponentAtNode(div);
});