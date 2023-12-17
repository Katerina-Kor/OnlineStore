import { FC, useEffect } from 'react';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
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
import CreateOrderFallback from '../../CreateOrderFallback/CreateOrderFallback';
import {
  HttpStatus,
  getErrorMessage,
  isFetchBaseQueryError,
} from '../../../types/apiTypes';
import { setUserLoggedOut } from '../../../store/reducers/authSlice';
import ErrorFallback from '../../ErrorFallback/ErrorFallback';
import EmptyCartFallback from '../../EmptyCartFallback/EmptyCartFallback';
import {
  setErrorMessage,
  setShowErrorAlert,
} from '../../../store/reducers/errorAlertSlice';

const CartPage: FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const {
    data: cartData,
    error: cartError,
    isFetching,
  } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });
  const [updateCart, updateCartResult] = useUpdateCartMutation();
  const [createOrder, createOrderResult] = useCreateOrderMutation();

  useEffect(() => {
    if (
      isFetchBaseQueryError(cartError) &&
      cartError.status === HttpStatus.UNAUTHORIZED
    ) {
      dispatch(setUserLoggedOut());
    }
  }, [cartError]);

  useEffect(() => {
    if (!updateCartResult.error) return;
    if (
      isFetchBaseQueryError(updateCartResult.error) &&
      updateCartResult.error.status === HttpStatus.UNAUTHORIZED
    ) {
      dispatch(setUserLoggedOut());
    } else {
      dispatch(setShowErrorAlert());
      dispatch(setErrorMessage(getErrorMessage(updateCartResult.error)));
    }
  }, [updateCartResult.error]);

  useEffect(() => {
    if (
      isFetchBaseQueryError(createOrderResult.error) &&
      createOrderResult.error.status === HttpStatus.UNAUTHORIZED
    ) {
      dispatch(setUserLoggedOut());
    }
  }, [createOrderResult.error]);

  const clearCart = async () => {
    if (!cartData) return;
    const updateCartPromises = cartData.data.cart.items.map(
      (product, index, arr) => {
        const needValidate = index === arr.length - 1 ? true : false;
        return updateCart({
          productId: product.product.id,
          count: 0,
          needValidate,
        });
      }
    );
    await Promise.all(updateCartPromises);
  };

  const handleCreateOrder = async () => {
    const createOrderResult = await createOrder();
    if ('error' in createOrderResult) return;
    await clearCart();
  };

  if (createOrderResult.status === 'fulfilled') {
    return <CreateOrderFallback />;
  }

  if (!isLoggedIn) {
    return <Cover isOpen />;
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
            <EmptyCartFallback />
          ) : (
            <>
              {cartData.data.cart.items.map((cartItem) =>
                cartItem.count ? (
                  <CartItem cartItem={cartItem} key={cartItem.product.id} />
                ) : null
              )}
              <Stack gap={1} alignItems={'center'}>
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
                  onClick={handleCreateOrder}
                  sx={{ width: '100%' }}
                >
                  {createOrderResult.isLoading ? (
                    <CircularProgress color="inherit" size={25} />
                  ) : (
                    'Order'
                  )}
                </Button>
              </Stack>
            </>
          ))}
      </Stack>
      {cartError && <ErrorFallback errorMessage={getErrorMessage(cartError)} />}
      {updateCartResult.error && (
        <ErrorFallback errorMessage={getErrorMessage(updateCartResult.error)} />
      )}
      {isFetching && <CircularProgress sx={{ margin: 0, padding: 5 }} />}
    </Stack>
  );
};

export default CartPage;
