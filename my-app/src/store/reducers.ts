import {combineReducers} from '@reduxjs/toolkit';
import employeeDataReducer from './modules/employeeData';


const rootReducer = combineReducers({
    employeeData: employeeDataReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;