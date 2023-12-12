import { AppBar, Typography, Toolbar } from '@mui/material';
import { FC, useEffect } from 'react';
import UserMenu from './UserMenu/UserMenu';
import NavLinksList from './NavLinksList/NavLinksList';
import CartIcon from './CartIcon/CartIcon';
import { useGetCartQuery } from '../../store/services/cartService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setUserLoggedOut } from '../../store/reducers/authSlice';
import { getTotalItems } from '../../utils/cartHelpers/cartHelpers';

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
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });
  console.log('header', isLoggedIn);

  useEffect(() => {
    if (error && 'status' in error && error.status === 401) {
      dispatch(setUserLoggedOut());
      console.log('header clear');
    }
  }, [error]);

  return (
    <>
      {!isLoading ? (
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
            <NavLinksList
              navLinks={
                isLoggedIn ? navLinksForLoggedUser : navLinksForUnloggedUser
              }
            />
            <UserMenu />
            {data && (
              <CartIcon productsNumber={getTotalItems(data.data.cart.items)} />
            )}
          </Toolbar>
        </AppBar>
      ) : null}
    </>
  );
};

export default Header;
