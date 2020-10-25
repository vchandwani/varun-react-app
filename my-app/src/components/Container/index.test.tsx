import React from 'react';
import { findByTestAttr } from '../../../test/testUtils';
import Container from './index';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});
 
const setup =({}) => {
  // Intial Setup for Container Component
    return shallow(<Container />)
}  

describe('Container initial load ',()=>{
  let wrapper;
 
  beforeEach(()=>{
    wrapper = setup({});
   })
  it('renders Container with heading ', () => {
    const headerRow = findByTestAttr(wrapper,'header');
    expect(headerRow.text()).toBe('React App');
  }); 
  it('renders Container with search component ', () => {
    const searchContainer = findByTestAttr(wrapper,'searchContainer');
    expect(searchContainer.exists()).toBe(true)
  }); 
  it('renders Container without employee data table ', () => {
    const employeeData = findByTestAttr(wrapper,'employeeData');
    expect(employeeData.exists()).toBe(false);
  });
});