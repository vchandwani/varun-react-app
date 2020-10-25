import React from 'react';
import { findByTestAttr } from '../../../test/testUtils';
import ModalComponent from './index';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});


const mockOnClose = jest.fn();
const mockOnDeleteClick = jest.fn();

const setup =(open=true) => {
    // Intial Setup for Modal Component
    return shallow(<ModalComponent open={open} onClose={mockOnClose} onDeleteClick={mockOnDeleteClick}  />)
}
it('renders Modal with open state', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper,'modalContainer');
  expect(component.length).toBe(1);
}); 

describe('Modal call functions',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = setup(true);
  })
  it('renders Modal heading ', () => {
    const header = wrapper.find('h2'); 
    expect(header.text()).toBe('Are you sure to delete ?');
  });
  it('calls onDeleteClick function ', () => {
    const proceedButton = findByTestAttr(wrapper,'proceedButton');
    proceedButton.simulate("click");
    expect(mockOnDeleteClick).toHaveBeenCalled();
  });
  it('calls onClose function ', () => {
    const cancelButton = findByTestAttr(wrapper,'cancelModal');
    cancelButton.simulate("click");
    expect(mockOnClose).toHaveBeenCalled();
  });
});