import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const MainPage: FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <Stack spacing={1} justifyContent={'center'}>
      <Typography
        component="h2"
        variant="h3"
        padding="20px"
        textAlign={'center'}
      >
        Online shop
      </Typography>
      <Typography component="h4" variant="h5" textAlign={'center'}>
        Welcome to our online shop!
      </Typography>
      {!isLoggedIn && (
        <Typography component="h4" variant="h5" textAlign={'center'}>
          Please, login to see products
        </Typography>
      )}
    </Stack>
  );
};

export default MainPage;
