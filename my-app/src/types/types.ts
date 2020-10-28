import {Action} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../store/reducers';


export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type Obj = ThunkAction<void, RootState, unknown, Action<string>>;
