import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { cartApi } from './services/cartService';
import authReducer from './reducers/authSlice';
// import { authApi } from './services/authService';
// import { productsApi } from './services/productsService';

const rootReducer = combineReducers({
  auth: authReducer,
  [cartApi.reducerPath]: cartApi.reducer,
  // [authApi.reducerPath]: authApi.reducer,
  // [productsApi.reducerPath]: productsApi.reducer,
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
