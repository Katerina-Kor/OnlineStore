import { FC, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Link, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useGetProductsListQuery } from '../../../store/services/cartService';
import { setUserLoggedOut } from '../../../store/reducers/authSlice';
import ProductCard from '../../ProductCard/ProductCard';

const ProductsListPage: FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const {
    data: productsData,
    error,
    isFetching,
  } = useGetProductsListQuery(undefined, {
    skip: !isLoggedIn,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (error && 'status' in error && error.status === 401) {
      dispatch(setUserLoggedOut());
    }
  }, [error]);

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
        Products
      </Typography>
      <Grid
        container
        spacing={3}
        width={'100%'}
      >
        {productsData &&
          productsData.data.map((product) => (
            <Grid
              item
              key={product.id}
              xs={12}
              sm={6}
              md={4}
              sx={{display: 'flex', justifyContent: 'center'}}
            >
              <ProductCard productInfo={product} key={product.id} />
            </Grid>
          ))}
        {isFetching && <p>Loading ...</p>}
      </Grid>
    </Stack>
  );
};

export default ProductsListPage;
