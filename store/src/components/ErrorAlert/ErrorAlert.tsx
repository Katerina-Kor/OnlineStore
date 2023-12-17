import { Alert, Snackbar } from '@mui/material';
import { FC } from 'react';

type ErrorAlertProps = {
  errorMessage?: string;
  isOpen: boolean;
  closeAction: () => void;
};

const ErrorAlert: FC<ErrorAlertProps> = ({
  errorMessage,
  isOpen,
  closeAction,
}) => {
  const defaultMessage = 'Sorry, something went wrong. Try later.';

  return (
    <Snackbar
      open={isOpen}
      onClose={closeAction}
      autoHideDuration={10000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ width: '80%' }}
    >
      <Alert severity="error" sx={{ width: '100%' }} onClose={closeAction}>
        {errorMessage || defaultMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
