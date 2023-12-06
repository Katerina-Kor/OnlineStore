import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { cartDataApi } from './services/cartDataService'
import authReducer from './reducers/authSlice';
import { authApi } from './services/authService';

const rootReducer = combineReducers({
  auth: authReducer,
  [cartDataApi.reducerPath]: cartDataApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(cartDataApi.middleware, authApi.middleware)
    },
  })
}

export type RootState = ReturnType<typeof rootReducer>
// export type AppDispatch =