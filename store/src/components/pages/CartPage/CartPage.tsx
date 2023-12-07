import { FC, useEffect, useState } from 'react';
import { getCart } from '../../../api/cartRequests';
import { CartData } from '../../../types/apiTypes';
import ValidationError from '../../../utils/customError/ValidationError';
import { Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setUserLoggedOut } from '../../../store/reducers/authSlice';
import { useGetCartQuery, useUpdateCartMutation } from '../../../store/services/cartService';

const CartPage: FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const { data: cartData } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  })
  const [ updateCart, updateCartResult ] = useUpdateCartMutation();

  if (!isLoggedIn) {
    return (
      <Stack spacing={2} justifyContent={'center'}>
        <Link component={RouterLink} to="/login" variant="h5">
          Please, login to continue
        </Link>
      </Stack>
    );
  }

  // if (error) {
  //   return <p>{error}</p>;
  // }

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
        {cartData ? (
          <>
            {cartData.data.cart.items.map((item) => (
              <div key={item.product.id}>
                <p>{item.product.title}</p>
                <p>{`Count: ${item.count}`}</p>
                <p>{`Price: ${item.product.price * item.count}`}</p>
              </div>
            ))}
            <p>{`Total: ${cartData.data.total}`}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Stack>
    </Stack>
  );
};

export default CartPage;
