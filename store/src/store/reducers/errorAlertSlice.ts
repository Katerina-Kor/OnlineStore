import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type errorAlertState = {
  isShowErrorAlert: boolean;
  errorMessage: string | undefined;
};

const initialState: errorAlertState = {
  isShowErrorAlert: false,
  errorMessage: undefined,
};

export const errorAlertSlice = createSlice({
  name: 'errorAlertInfo',
  initialState,
  reducers: {
    setShowErrorAlert: (state) => {
      state.isShowErrorAlert = true;
      console.log('slice');
    },
    setHideErrorAlert: (state) => {
      state.isShowErrorAlert = false;
    },
    setErrorMessage: (state, action: PayloadAction<string | undefined>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setShowErrorAlert, setHideErrorAlert, setErrorMessage } =
  errorAlertSlice.actions;
export default errorAlertSlice.reducer;
export type { errorAlertState };
