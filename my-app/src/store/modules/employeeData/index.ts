import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from '../../../types';
 import api from '../../../lib/api';
import {AppDispatch} from '../../index';
import { EmployeeDataObject,DataOperation,EmployeeDataState } from '../../../types/employee';


export interface EmployeeDataActionPayload {
    data?:EmployeeDataObject[];
    error?:string|undefined;
    operation?:string;
}

export const initialState:EmployeeDataState =  {
    isLoading: false,
    isLoaded: false,
    error: undefined,
    employeeData: [],
    isActioned: false,
}

const employeeData = createSlice({
    name :'employeeData',
    initialState,
    reducers : {
        //Start loading employee Data
        loadEmployeeDataStart(state) : void {
            state.isLoaded= false;
            state.isLoading= true;
            state.isActioned= false;
        },
        //Employee Data added
        loadEmployeeDataComplete(
            state,
            {payload}: PayloadAction<EmployeeDataActionPayload>
        ) : void {
            state.isLoaded=true;
            state.isLoading= false;
            if(payload.data) {
                state.employeeData = payload.data;
            }
            if(payload.operation){
                state.isActioned= true;
            }
        },
        // Employe Data fail
        loadEmployeeDataFailed(state, action : PayloadAction<EmployeeDataActionPayload>):void {
            state.isLoaded = false;
            state.isLoading = false;
            state.error = action.payload.error || 'Unkown error';
            state.isActioned= false;
        },
        clearResults(state) : void {
            state = initialState;
        }
    }
});

// Export actions
export const {
    loadEmployeeDataStart,
    loadEmployeeDataComplete,
    loadEmployeeDataFailed,
    clearResults,
} = employeeData.actions;


export default employeeData.reducer;

//Async actions

export const loadEmployeeData = (
    url:string,
    request:DataOperation,
    dataObject?:EmployeeDataObject|undefined,
) : AppThunk => {
    return async(dispatch:AppDispatch) => {
        dispatch(loadEmployeeDataStart());
        try {
            const results = await api.employeeData.loadEmployeeData(
                url,
                request,
                dataObject
            );
            dispatch(
                loadEmployeeDataComplete(
                    results
                )
            );
        } catch (error) {
            let errorMessage = error;
            if(error && error.message) {
                errorMessage = error.message;
            }
            dispatch(
                loadEmployeeDataFailed({
                    error: errorMessage,
                })
            )
        };
    };
};
