import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

type ErrorFallbackProps = {
  errorMessage?: string;
};

const ErrorFallback: FC<ErrorFallbackProps> = ({ errorMessage }) => {
  const defaultMessage = 'Sorry, something went wrong. Try later.';
  return (
    <Stack justifyContent={'center'} alignItems={'center'}>
      <Typography>{errorMessage || defaultMessage}</Typography>
    </Stack>
  );
};

export default ErrorFallback;
