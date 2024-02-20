import { FC } from 'react';
import AuthentificationForm from '../../forms/AuthentificationForm/AuthentificationForm';
import { Box, Typography } from '@mui/material';
import styles from '../pages.module.css';

const LoginPage: FC = () => {
  return (
    <Box className={styles.wrapper}>
      <Typography component="h2" variant="h4" padding="20px">
        Login
      </Typography>
      <AuthentificationForm formType="login" />
    </Box>
  );
};

export default LoginPage;
