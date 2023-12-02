import {
  AppBar,
  Typography,
  Link,
  Toolbar,
  IconButton,
  Stack,
} from '@mui/material';
import { FC, useContext } from 'react';
import { ShoppingCart } from '@mui/icons-material';
import UserMenu from './UserMenu/UserMenu';
import { AuthContext } from '../context/AuthContext';

const Header: FC = () => {
  const isLogged = useContext(AuthContext);

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={2}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap', gap: '10px' }}>
          <Typography variant="h6" color="inherit" noWrap>
            Online Shop
          </Typography>
          <Stack
            component="nav"
            direction="row"
            justifyContent="center"
            sx={{ flexGrow: 1 }}
          >
            <Link
              variant="button"
              color="text.primary"
              href="/"
              sx={{ my: 1, mx: 1.5 }}
            >
              Home
            </Link>
            {isLogged && (
              <Link
                variant="button"
                color="text.primary"
                href="/products"
                sx={{ my: 1, mx: 1.5 }}
              >
                Products
              </Link>
            )}
          </Stack>
          <UserMenu />
          {isLogged && (
            <IconButton sx={{ p: 0 }}>
              <ShoppingCart fontSize="large" color="primary" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
