import {
  AppBar,
  Typography,
  Toolbar,
} from '@mui/material';
import { FC, useContext } from 'react';
import UserMenu from './UserMenu/UserMenu';
import { AuthContext } from '../context/AuthContext';
import NavLinksList from './NavLinksList/NavLinksList';
import CartIcon from './CartIcon/CartIcon';
import { CartContext } from '../context/CartContext';

const navLinksForUnloggedUser = [
  {
    name: 'Home',
    href: '/',
  },
];

const navLinksForLoggedUser = navLinksForUnloggedUser.concat({
  name: 'Products',
  href: '/products',
});

const Header: FC = () => {
  const isLogged = useContext(AuthContext);
  const {cartItems, totalItems, isError, error, isLoading} = useContext(CartContext);
  console.log(cartItems, totalItems, isLoading, isError, error)

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
          <NavLinksList navLinks={isLogged ? navLinksForLoggedUser : navLinksForUnloggedUser} />
          <UserMenu />
          {isLogged && <CartIcon />}
          <p>{totalItems}</p>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
