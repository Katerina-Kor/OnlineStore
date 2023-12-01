import { Button, Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const MainPage: FC = () => {
  const isLogged = useContext(AuthContext);
  const navigate = useNavigate();
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
      <Stack
        spacing={1}
        direction={'row'}
        justifyContent={'center'}
        padding={2}
      >
        <Button
          onClick={() => navigate('/register')}
          variant="outlined"
          color="secondary"
        >
          sign up
        </Button>

        {isLogged ? (
          <>
            <Button
              onClick={() => navigate('/cart')}
              variant="outlined"
              color="secondary"
            >
              cart
            </Button>
            <Button
              onClick={() => navigate('/products')}
              variant="outlined"
              color="secondary"
            >
              products
            </Button>
          </>
        ) : (
          <Button
            onClick={() => navigate('/login')}
            variant="outlined"
            color="secondary"
          >
            login
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default MainPage;

//"button" | "caption" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline"
