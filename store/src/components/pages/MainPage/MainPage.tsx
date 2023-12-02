import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const MainPage: FC = () => {
  const isLogged = useContext(AuthContext);
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
      {!isLogged && (
        <Typography component="h4" variant="h5" textAlign={'center'}>
          Please, login to see products
        </Typography>
      )}
    </Stack>
  );
};

export default MainPage;
