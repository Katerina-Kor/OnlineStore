import { FC } from 'react';
import {
  Button,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import {
  useCreateOrderMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from '../../../store/services/cartService';
import CartItem from '../../CartItem/CartItem';
import { isCartEmpty } from '../../../utils/cartHelpers/cartHelpers';
import Cover from '../../Cover/Cover';

const CartPage: FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const { data: cartData, isError } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });
  const [updateCart, updateCartResult] = useUpdateCartMutation();
  const [createOrder, createOrderResult] = useCreateOrderMutation();
  const navigate = useNavigate();

  const clearCart = async () => {
    if (!cartData) return;
    const updateCartPromises = cartData.data.cart.items.map(
      (product, index, arr) => {
        const needValidate = index === arr.length - 1 ? true : false;
        return updateCart({ productId: product.product.id, count: 0, needValidate })
      }
    );
    await Promise.all(updateCartPromises);
  }

  if (createOrderResult.status === 'fulfilled') {
    return (
      <Stack spacing={2} alignItems={'center'}>
        <Typography textAlign={'center'} variant="h6" padding="20px">
          Thank you for your order! We will contact you soon.
        </Typography>
        <Button
          role='link'
          size="large"
          variant="contained"
          onClick={() => navigate('/products')}
          sx={{width: '80%'}}  
        >
          continue shopping
        </Button>
      </Stack>
    )
  }

  if (!isLoggedIn) {
    return (
      <Cover isOpen />
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
            <Stack gap={1} alignItems={'center'}>
              <Typography variant="h6" textAlign={'center'}>
                Cart is empty
              </Typography>
              <Typography variant='body1' textAlign='center'>
                Visit catalog to select products
              </Typography>
              <Button
                role='link'
                size="large"
                variant="contained"
                onClick={() => navigate('/products')}
                sx={{width: '80%'}}
              >
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
              <Stack gap={1} alignItems={'center'} >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  padding={2}
                  width={'100%'}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Total:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {`$${cartData.data.total}`}
                  </Typography>
                </Stack>
                <Button
                  size="large"
                  variant="contained"
                  onClick={async () => {
                    await createOrder();
                    await clearCart();
                  }}
                  sx={{width: '100%'}}
                >
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
