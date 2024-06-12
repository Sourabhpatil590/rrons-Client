import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobsSlice';
import currentUserReducer from './slices/currentUserSlice';
import metaDataReducer from './slices/metaDataSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';
import { combineReducers } from 'redux';

const persistConfig = {
	key: 'root',
	storage,
};

const rootReducer = combineReducers({
	jobsList: jobsReducer,
	currentUser: currentUserReducer,
	metaData: metaDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: () => [thunk],
});

export const persistor = persistStore(store);

export default store;
