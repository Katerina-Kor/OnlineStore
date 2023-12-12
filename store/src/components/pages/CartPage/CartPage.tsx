import { FC } from 'react';
import { Link, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useGetCartQuery, useUpdateCartMutation } from '../../../store/services/cartService';
import CartItem from '../../CartItem/CartItem';

const CartPage: FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const { data: cartData, isError } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  })
  const [ updateCart, updateCartResult ] = useUpdateCartMutation();
  // const cartIsEmpty = cartData?.data.cart.items.find((item) => item.count > 0);

  if (!isLoggedIn) {
    return (
      <Stack spacing={2} justifyContent={'center'}>
        <Link component={RouterLink} to="/login" variant="h5">
          Please, login to continue
        </Link>
      </Stack>
    );
  }

  if (isError) {
    return <p>error</p>;
  }

  return (
    <Stack spacing={2} justifyContent={'center'}>
      <Typography
        component="h2"
        variant="h3"
        padding="20px"
        textAlign={'center'}
      >
        Cart
      </Typography>
      <Stack direction={'column'} gap={2} flexWrap={'wrap'} justifyContent={'center'} padding={3}>
        {cartData && (
          cartData.data.cart.items.map((cartItem) => (
            cartItem.count
            ? <CartItem cartItem={cartItem} key={cartItem.product.id} />
            : null
          ))
        )}
        <ListItem sx={{ padding: (theme) => theme.spacing(1, 0) }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {cartData?.data.total || 0}
          </Typography>
        </ListItem>
      </Stack>
    </Stack>
  );
};

export default CartPage;
