import { FC, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useUpdateCartMutation, useGetProductsListQuery, useGetCartQuery } from '../../../store/services/cartService';
import { setUserLoggedOut } from '../../../store/reducers/authSlice';
import { getProductNumberInCart } from '../../../utils/cartHelpers/cartHelpers';
import ProductCard from '../../ProductCard/ProductCard';

const ProductsListPage: FC = () => {
  
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { data: productsData, error, isError, isLoading} = useGetProductsListQuery(undefined, {
    skip: !isLoggedIn,
  })
  const { data: cartData } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  })
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (error && 'status' in error && error.status === 401) {
      dispatch(setUserLoggedOut())
      console.log('products page clear')
    }
  }, [error])

  // useEffect(() => {
  //   if (!isLogged) return;
  //   const fetchData = async () => {
  //     try {
  //       const responce = await getProductsList();
  //       setProducts(responce);
  //     } catch (e) {
  //       if (e instanceof ValidationError) {
  //         if (e.statusCode === 401) {
  //           changeLoginStatus(false);
  //         } else {
  //           setError(e.message);
  //         }
  //       } else if (e instanceof Error) {
  //         setError(e.message);
  //       } else {
  //         throw error;
  //       }
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const addToCart = async (productId: string) => {
  //   try {
  //     await updateCart({productId, count: 1});
  //   } catch (e) {}
  // };

  if (!isLoggedIn) {
    return (
      <Stack spacing={2} justifyContent={'center'}>
        <Link component={RouterLink} to="/login" variant="h5">
          Please, login to continue
        </Link>
      </Stack>
    );
  }

  if (error) {
    return <p>{`${error}`}</p>;
  }

  return (
    <Stack spacing={2} justifyContent={'center'}>
      <Typography
        component="h2"
        variant="h3"
        padding="20px"
        textAlign={'center'}
      >
        Products list
      </Typography>
      <Stack direction={'row'} gap={2} flexWrap={'wrap'} justifyContent={'center'} padding={3}>
        {productsData && cartData ? (
          productsData.data.map((product) => (
            <ProductCard productInfo={product} cartItems={cartData.data.cart.items} key={product.id} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Stack>
    </Stack>
  );
};



export default ProductsListPage;
