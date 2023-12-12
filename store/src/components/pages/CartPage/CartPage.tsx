import { FC } from 'react';
import {
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import {
  useGetCartQuery,
  useUpdateCartMutation,
} from '../../../store/services/cartService';
import CartItem from '../../CartItem/CartItem';
import { isCartEmpty } from '../../../utils/cartHelpers/cartHelpers';

const CartPage: FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const { data: cartData, isError } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });
  const [updateCart, updateCartResult] = useUpdateCartMutation();
  const navigate = useNavigate();

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
      <Stack
        direction={'column'}
        gap={2}
        flexWrap={'wrap'}
        justifyContent={'center'}
        padding={3}
      >
        {cartData &&
          (isCartEmpty(cartData.data.cart.items) ? (
            <Stack gap={1}>
              <Typography variant="h6" textAlign={'center'}>
                Cart is empty
              </Typography>
              <Typography variant='body1' textAlign='center'>
                Visit catalog to select products
              </Typography>
              <Button role='link' size="large" variant="contained" onClick={() => navigate('/products')}>
                go shopping
              </Button>
            </Stack>
          ) : (
            <>
              {cartData.data.cart.items.map((cartItem) =>
                cartItem.count ? (
                  <CartItem cartItem={cartItem} key={cartItem.product.id} />
                ) : null
              )}
              <Stack gap={1}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  padding={2}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Total:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {`$${cartData.data.total}`}
                  </Typography>
                </Stack>
                <Button size="large" variant="contained">
                  Order
                </Button>
              </Stack>
            </>
          ))}
      </Stack>
    </Stack>
  );
};

export default CartPage;
