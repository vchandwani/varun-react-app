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
];
const dataEmpty : EmployeeDataObject[] = [];


const setup =({}) => {
  // Intial Setup for Container Component
  return shallow(<EmployeeData
    data={data}
    onActionClick={mockOnActionClick}
  />)
}  
const setupEmpty =({}) => {
  // Intial Setup for Container Component
  return shallow(<EmployeeData
    data={dataEmpty}
    onActionClick={mockOnActionClick}
  />)
}  
describe('Employee data table initial load ',()=>{
  let wrapper;
  let mockSetDefaultView = jest.fn(); 

  beforeEach(()=>{
    mockSetDefaultView.mockClear();
    React.useState = jest.fn(()=> [true, mockSetDefaultView]);
    wrapper = setupEmpty({});
   })
  it('renders component with button', () => {
    const tableButton = findByTestAttr(wrapper,'tableButton');
    expect(tableButton.exists()).toBe(true);
  });  
  it('renders component and calls button function', () => {
    const addButton = findByTestAttr(wrapper,'tableButton');
    expect(addButton.text()).toBe('Add Employee');
    addButton.simulate("click");
    expect(mockOnActionClick).toHaveBeenCalled();
  });  
  it('renders component without table row', () => {
    const tableRow = findByTestAttr(wrapper,'tableRow');
    expect(tableRow.exists()).toBe(false);
  }); 
}); 
 
describe('load table with proper data set ',()=>{
  let wrapper;
  let mockSetDefaultView = jest.fn(); 

  beforeEach(()=>{
    mockSetDefaultView.mockClear();
    React.useState = jest.fn(()=> [true, mockSetDefaultView]);
    wrapper = setup({});
   })
  it('has two rows of data present', () => {
    const dataTableRow = findByTestAttr(wrapper,'tableRow');
    expect(dataTableRow.length).toBe(2)
  }); 
}); 