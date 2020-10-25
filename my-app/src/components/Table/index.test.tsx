import React from 'react';
import { findByTestAttr } from '../../../test/testUtils';
import EmployeeData from './index';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {EmployeeDataObject} from '../../types/employee';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});


const mockOnActionClick = jest.fn(); 

const data : EmployeeDataObject[] = [{
  firstName:'Test',
  lastName:'Last',
  dateOfBirth: new Date(),
  id:1
  },{
    firstName :'Second',
    lastName: 'Last',
    dateOfBirth : new Date(),
    id: 2
  }
]
const setup =({}) => {
  // Intial Setup for Container Component
    return shallow(<EmployeeData
      data={data}
      onActionClick={mockOnActionClick}
      />)
}  

describe('Container initial load ',()=>{
  let wrapper;
  let mockSetDefaultView = jest.fn(); 

  beforeEach(()=>{
    mockSetDefaultView.mockClear();
    React.useState = jest.fn(()=> [true, mockSetDefaultView]);
    wrapper = setup({});
   })
  it('renders Employee data table ', () => {
    const tableContainer = findByTestAttr(wrapper,'tableContainer');
    expect(tableContainer.exists()).toBe(true)
  });  
  it('renders Employee data table with two records', () => {
    const dataTableRow = findByTestAttr(wrapper,'tableRow');
    expect(dataTableRow.length).toBe(2)
  });  
}); 

describe('Container add employee button check ',()=>{
  let wrapper;
  let mockSetDefaultView = jest.fn(); 

  beforeEach(()=>{
    mockSetDefaultView.mockClear();
    React.useState = jest.fn(()=> [true, mockSetDefaultView]);
    wrapper = setup({});
   })
  it('click on add employee button ', () => {
    const addButton = findByTestAttr(wrapper,'tableButton');
    expect(addButton.text()).toBe('Add Employee');
    addButton.simulate("click");
    expect(mockOnActionClick).toHaveBeenCalled();
  }); 
}); 