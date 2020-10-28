import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import rootReducer from './reducers';
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';

//Main redux store setup
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        serializableCheck : {
            ignoredActions : [FLUSH,REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
});

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
