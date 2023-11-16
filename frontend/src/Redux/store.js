import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

import authReducer from "./slices/authSlice";
import numColumnsReducer from './slices/gridColumnSlice';
import roleReducer from './slices/roleSlice';
import idReducer from './slices/idSlice';

const persistConfig = {
  key: 'root', // key for storage
  storage,
  whitelist: ['auth', 'numColumns', 'role', 'id'], // slices to persist
};

const rootReducer = combineReducers({
  auth: authReducer,
  numColumns: numColumnsReducer,
  role: roleReducer,
  id: idReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export {
  persistor,
  store
};
