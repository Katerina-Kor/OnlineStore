import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import tokenStorageInstance from '../../utils/tokenStorage/tokenStorage';

type AuthState = {
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  isLoggedIn: tokenStorageInstance.hasToken(),
};

export const authSlice = createSlice({
  name: 'authInfo',
  initialState,
  reducers: {
    setUserLoggedIn: (state, action: PayloadAction<string>) => {
      tokenStorageInstance.setToken(action.payload);
      state.isLoggedIn = true;
      console.log('ping', tokenStorageInstance.getToken());
    },
    setUserLoggedOut: (state) => {
      tokenStorageInstance.clearToken();
      state.isLoggedIn = false;
      console.log('clear token');
    },
  },
});

export const { setUserLoggedIn, setUserLoggedOut } = authSlice.actions;
export default authSlice.reducer;
export type { AuthState };
