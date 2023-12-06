import { Box } from '@mui/material';
import styles from './App.module.css';
import AppRouter from './components/router/AppRouter';
import AuthContextProvider from './components/context/AuthContext';
import Header from './components/Header/Header';
import CartContextProvider from './components/context/CartContext';
import Cover from './components/Cover/Cover';

function App() {
  return (
    <>
      {/* <AuthContextProvider> */}
        {/* <CartContextProvider> */}
          <Header />
          <Box component="main" className={styles.main}>
            <AppRouter />
            {/* <Cover /> */}
          </Box>
        {/* </CartContextProvider> */}
      {/* </AuthContextProvider> */}
    </>
  );
}

export default App;
