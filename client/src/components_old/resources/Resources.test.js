/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Resources from './Resources';


it('renders without crashing', () => {
  const testResources = [{ text: 'Test 1', href: 'www.chayn.co' }];
  const div = document.createElement('div');
  ReactDOM.render(<Resources resources={testResources} lang="en"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('Renders correctly with one resource', () => {
  const testResources = [{ text: 'Test 1', href: 'www.chayn.co' }];
  const resourceTest = renderer.create(<Resources
    resources={testResources} lang="en"
  />).toJSON();

  expect(resourceTest).toMatchSnapshot();
});

test('Renders correctly with two resources', () => {
  const testResources = [{ text: 'Test 1', href: 'www.chayn.co' }, { text: 'Test 2', href: 'www.chayn.co' }];
  const resourceTest = renderer.create(<Resources
    resources={testResources} lang="en"
  />).toJSON();

  expect(resourceTest).toMatchSnapshot();
});
