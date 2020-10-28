import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const initialStoreState = {
  employeeData: {
    isLoading:false,
    isLoaded:true,
    employeeData : [
      {
        id:1,
        firstName:'first',
        lastName:'last',
        dateOfBirth:"2020-10-10"
      }
    ],
    isActioned: false,
  },
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