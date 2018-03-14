/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import Resources from './Resources';
import renderer from 'react-test-renderer';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Resources />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('Renders correctly with one resource', () => {
  const testResources = [{ text: 'Test 1', href: 'www.chayn.co' }]
  const resourceTest = renderer.create(
    <Resources resources={testResources} />
  ).toJSON();

  expect(resourceTest).toMatchSnapshot();
});

test('Renders correctly with two resources', () => {
  const testResources = [{ text: 'Test 1', href: 'www.chayn.co' },  { text: 'Test 1', href: 'www.chayn.co' }]
  const resourceTest = renderer.create(
    <Resources resources={testResources} />
  ).toJSON();

  expect(resourceTest).toMatchSnapshot();
});
