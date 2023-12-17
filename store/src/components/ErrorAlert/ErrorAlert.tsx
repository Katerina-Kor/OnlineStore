import { Alert, Snackbar } from '@mui/material';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setHideErrorAlert } from '../../store/reducers/errorAlertSlice';

type ErrorAlertProps = {
  // errorMessage?: string;
  // isOpen: boolean;
  // closeAction: () => void;
};

const ErrorAlert: FC<ErrorAlertProps> = (
  {
    // errorMessage,
    // isOpen,
    // closeAction,
  }
) => {
  const isShowErrorAlert = useSelector(
    (state: RootState) => state.errorAlert.isShowErrorAlert
  );
  const errorMessage = useSelector(
    (state: RootState) => state.errorAlert.errorMessage
  );
  const dispatch = useDispatch();
  const defaultMessage = 'Sorry, something went wrong. Try later.';
  console.log('ping alert', isShowErrorAlert);

  return (
    <Snackbar
      open={isShowErrorAlert}
      onClose={() => dispatch(setHideErrorAlert())}
      autoHideDuration={10000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ width: '80%' }}
    >
      <Alert
        severity="error"
        sx={{ width: '100%' }}
        onClose={() => dispatch(setHideErrorAlert())}
      >
        {errorMessage || defaultMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
