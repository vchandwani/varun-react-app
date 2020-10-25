import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const setup =() => {
  // Intial Setup for App Component
  return shallow(<App  />)
}

test('renders app', () => {
  const wrapper = setup();
  expect(wrapper.length).toBe(1);
});
