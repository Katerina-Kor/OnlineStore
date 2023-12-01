import { Box } from '@mui/material';
import styles from './App.module.css';
import AppRouter from './components/router/AppRouter';
import AuthContextProvider from './components/context/AuthContext';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Box component="main" className={styles.main}>
          <AppRouter />
        </Box>
      </AuthContextProvider>
    </>
  );
}

export default App;
