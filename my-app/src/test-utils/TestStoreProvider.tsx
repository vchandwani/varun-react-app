import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { EmployeeDataStateObj } from '../types/employee';

const initialStoreState:EmployeeDataStateObj = {
  employeeData : {
    isLoading:false,
    isLoaded:true,
    employeeData : [
      {
        firstName:'first',
        lastName:'last',
        dateOfBirth: new Date(),
        id:1
      }
    ],
    isActioned: false,
    error:undefined
  }
};

const mockStore = configureStore([thunk]);
export interface TestStoreProviderProps {
  storeState?: any;
  children?: React.ReactNode;
}
const TestStoreProvider = ({
  storeState = {},
  children,
}: TestStoreProviderProps): JSX.Element => {
  const finalStoreState = { ...initialStoreState, ...storeState };
  const store = mockStore(finalStoreState);
  return <Provider store={store}>{children || null}</Provider>;
};
export default TestStoreProvider;  