import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { cartApi } from './services/cartService';
import authReducer from './reducers/authSlice';
import errorAlertReducer from './reducers/errorAlertSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  errorAlert: errorAlertReducer,
  [cartApi.reducerPath]: cartApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(cartApi.middleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
