import { Box } from '@mui/material';
import styles from './App.module.css';
import AppRouter from './components/router/AppRouter';
import AuthContextProvider from './components/context/AuthContext';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <Box component="main" className={styles.main}>
          <AppRouter />
        </Box>
      </AuthContextProvider>
    </>
  );
}

export default App;
