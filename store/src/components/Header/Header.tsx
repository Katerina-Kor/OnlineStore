import {
  AppBar,
  Typography,
  Toolbar,
} from '@mui/material';
import { FC, useContext, useEffect } from 'react';
import UserMenu from './UserMenu/UserMenu';
import { AuthContext, ChangeAuthContext } from '../context/AuthContext';
import NavLinksList from './NavLinksList/NavLinksList';
import CartIcon from './CartIcon/CartIcon';
import { CartContext } from '../context/CartContext';
import { useGetCartDataQuery } from '../../store/services/cartDataService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setUserLoggedOut } from '../../store/reducers/authSlice';

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
  // const isLogged = useContext(AuthContext);
  const isLogged = useSelector((state: RootState) => state.auth.isLoggedIn)
  const dispatch = useDispatch();
  // const changeAuthContext = useContext(ChangeAuthContext);
  const { data, error, isLoading } = useGetCartDataQuery(null, {
    skip: !isLogged
  });

  useEffect(() => {
    if (error && 'status' in error && error.status === 401) {
      dispatch(setUserLoggedOut())
    }
  }, [error])

  return (
    <>
    { !isLoading ?
      (<AppBar
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
        </Toolbar>
      </AppBar>) : (
        null
      )
    }
    </>
  );
};

export default Header;
