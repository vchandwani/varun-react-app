import React from 'react';
import { findByTestAttr } from '../../../test/testUtils';
import Container from './index';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});


const mockOnClose = jest.fn();
const mockOnDeleteClick = jest.fn();

const setup =({}) => {
  // Intial Setup for Container Component
    return shallow(<Container />)
}  

describe('Container initial load ',()=>{
  let wrapper;
  let mockSetDefaultView = jest.fn(); 

  beforeEach(()=>{
    mockSetDefaultView.mockClear();
    React.useState = jest.fn(()=> [true, mockSetDefaultView]);
    wrapper = setup({});
   })
  it('renders Container heading ', () => {
    const headerRow = findByTestAttr(wrapper,'header');
    expect(headerRow.text()).toBe('React App');
  }); 
  it('renders Container with employee data table ', () => {
    const employeeData = findByTestAttr(wrapper,'employeeData');
    expect(employeeData.exists()).toBe(true);
  }); 
});

describe('Container with display message ',()=>{
  let wrapper;
  let mockSetDisplayMessage = jest.fn(); 
  let mockSetDefaultView = jest.fn(); 

  beforeEach(()=>{
    mockSetDisplayMessage.mockClear();
    mockSetDefaultView.mockClear();
    React.useState = jest.fn(()=> ['Success', mockSetDisplayMessage]);
    React.useState = jest.fn(()=> [false, mockSetDefaultView]);
    wrapper = setup({});
   })
  // it('renders Container with display message ', () => {
  //   React.useState = jest.fn(()=> ['Success', mockSetDisplayMessage]);
  //   const successMessage = findByTestAttr(wrapper,'successMessage');
  // }); 
  it('doesn`t renders employee data table ', () => {
    const employeeData = findByTestAttr(wrapper,'employeeData');
    expect(employeeData.exists()).toBe(false)
  }); 
});

describe('Container with Modal ',()=>{
  let wrapper;
  let mockSetConfirmationModal= jest.fn();  
  beforeEach(()=>{
    mockSetConfirmationModal.mockClear();
    React.useState = jest.fn(()=> [true, mockSetConfirmationModal]);
    wrapper = setup({});
   })
  // it('renders Container with display message ', () => {
  //   React.useState = jest.fn(()=> ['Success', mockSetDisplayMessage]);
  //   const successMessage = findByTestAttr(wrapper,'successMessage');
  // }); 
  // it('renders modal on container ', () => {
  //   console.log(wrapper.debug());
  //   const modalContainer = findByTestAttr(wrapper,'modalContainer');
  //   expect(modalContainer.exists()).toBe(true)
  // }); 
});