import { Box } from '@mui/material';
import styles from './App.module.css';
import AppRouter from './components/router/AppRouter';

function App() {
  return (
    <>
      <Box component="main" className={styles.main}>
        <AppRouter />
      </Box>
    </>
  );
}

export default App;
