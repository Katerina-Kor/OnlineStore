import { Box } from '@mui/material';
import styles from './App.module.css';
import AppRouter from '../AppRouter/AppRouter';
import Header from '../Header/Header';
import ErrorAlert from '../ErrorAlert/ErrorAlert';

function App() {
  return (
    <>
      <Header />
      <Box component="main" className={styles.main}>
        <AppRouter />
        <ErrorAlert />
      </Box>
    </>
  );
}

export default App;
