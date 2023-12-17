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
import { HttpStatus, isFetchBaseQueryError } from '../../types/apiTypes';

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
  const {
    data: cartData,
    error: cartError,
    isLoading,
  } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    if (
      isFetchBaseQueryError(cartError) &&
      cartError.status === HttpStatus.UNAUTHORIZED
    ) {
      dispatch(setUserLoggedOut());
    }
  }, [cartError]);

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
            {isLoggedIn && (
              <CartIcon
                productsNumber={
                  cartData ? getTotalItems(cartData.data.cart.items) : 0
                }
              />
            )}
          </Toolbar>
        </AppBar>
      ) : null}
    </>
  );
};

export default Header;
