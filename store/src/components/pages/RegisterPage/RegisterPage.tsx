import { FC } from 'react';
import AuthentificationForm from '../../forms/AuthentificationForm/AuthentificationForm';
import { Box, Typography } from '@mui/material';
import styles from '../pages.module.css';

const RegisterPage: FC = () => {
  return (
    <Box className={styles.wrapper}>
      <Typography component="h2" variant="h4" padding="20px">
        Sign Up
      </Typography>
      <AuthentificationForm formType="register" />
    </Box>
  );
};

export default RegisterPage;
