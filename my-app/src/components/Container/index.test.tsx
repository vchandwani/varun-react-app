import React from 'react';
import { findByTestAttr } from '../../../test/testUtils';
import Container from './index';
import Enzyme, { mount,shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import TestStoreProvider from '../../test-utils/TestStoreProvider';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const setup =(store={}) => {
   // Intial Setup for Container Component
    const component =  shallow(
      <TestStoreProvider storeState={store}>
        <Container />
      </TestStoreProvider>
    );
    return component;
}  

describe('Container initial load ',()=>{
  let wrapper;
 
  beforeEach(()=>{
    wrapper = setup();
  });

  it('renders container', () => {
    wrapper = setup({
    employeeData: {
      isLoading:true,
      isLoaded:false,
      employeeData : [],
      isActioned: false,
      error:undefined
    }});
    console.log(wrapper.debug());
    const headerRow = findByTestAttr(wrapper,'header');
    console.log(headerRow.debug());
  });
  
  // it('renders Container with heading ', () => {
  //   wrapper = setup({});
  
  //   console.log(wrapper.debug());
  //   // const headerRow = findByTestAttr(wrapper,'header');
  //   // expect(headerRow.text()).toBe('React App');
  // }); 
  // it('renders Container with search component ', () => {
  //   const searchContainer = findByTestAttr(wrapper,'searchContainer');
  //   expect(searchContainer.exists()).toBe(true)
  // }); 
  // it('renders Container without employee data table ', () => {
  //   const employeeData = findByTestAttr(wrapper,'employeeData');
  //   expect(employeeData.exists()).toBe(false);
  // });
});