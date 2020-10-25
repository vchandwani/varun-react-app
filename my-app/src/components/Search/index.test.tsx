import React from 'react';
import { findByTestAttr } from '../../../test/testUtils';
import Search from './index';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const mockOnSearchClick = jest.fn(); 
 
const setup =({}) => {
  // Intial Setup for Container Component
    return shallow(<Search
      onSearchClick={mockOnSearchClick}
    />)
}  

describe('Search initial load ',()=>{
  let wrapper;
  let mockSetFirstName = jest.fn(); 
  let mockSetLastName = jest.fn(); 

  beforeEach(()=>{
    mockSetFirstName.mockClear();
    mockSetLastName.mockClear();
    React.useState = jest.fn(()=> ['Test', mockSetFirstName]);
    React.useState = jest.fn(()=> ['last', mockSetLastName]);
    wrapper = setup({});
   })
  it('renders search component ', () => {
    const searchContainer = findByTestAttr(wrapper,'searchContainer');
    expect(searchContainer.exists()).toBe(true)
  });  
  it('renders first name with entered value ', () => {
    const firstName = findByTestAttr(wrapper,'firstName');
    const mockEvent = {target : {value : 'test'}};
    firstName.simulate("change",mockEvent);
    wrapper.update();
    const searchContainer = findByTestAttr(wrapper,'searchContainer');
    const updatedFirstName = findByTestAttr(searchContainer,'firstName');
    expect(updatedFirstName.props().value).toBe('test');
  });  
  it('renders last name with entered value ', () => {
    const lastName = findByTestAttr(wrapper,'lastName');
    const mockEvent = {target : {value : 'test'}};
    lastName.simulate("change",mockEvent);
    wrapper.update();
    const searchContainer = findByTestAttr(wrapper,'searchContainer');
    const updatedLastName = findByTestAttr(searchContainer,'lastName');
    expect(updatedLastName.props().value).toBe('test');
  });  
  it('calls function on click of search', () => {
    const searchButton = findByTestAttr(wrapper,'searchButton');
    searchButton.simulate("click");
    expect(mockOnSearchClick).toHaveBeenCalled();
  });  
});  