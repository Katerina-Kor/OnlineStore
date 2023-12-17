import { FC, useEffect } from 'react';
import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useGetProductsListQuery } from '../../../store/services/cartService';
import { setUserLoggedOut } from '../../../store/reducers/authSlice';
import ProductCard from '../../ProductCard/ProductCard';
import Cover from '../../Cover/Cover';
import {
  HttpStatus,
  getErrorMessage,
  isFetchBaseQueryError,
} from '../../../types/apiTypes';
import ErrorFallback from '../../ErrorFallback/ErrorFallback';

const CatalogPage: FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const {
    data: productsData,
    error: productsError,
    isFetching,
  } = useGetProductsListQuery(undefined, {
    skip: !isLoggedIn,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      isFetchBaseQueryError(productsError) &&
      productsError.status === HttpStatus.UNAUTHORIZED
    ) {
      dispatch(setUserLoggedOut());
    }
  }, [productsError]);

  if (!isLoggedIn) {
    return <Cover isOpen />;
  }

  return (
    <Stack
      spacing={2}
      justifyContent={'center'}
      alignItems={'center'}
      direction={'column'}
    >
      <Typography
        component="h2"
        variant="h3"
        padding="20px"
        textAlign={'center'}
      >
        Catalog
      </Typography>
      {productsData && (
        <Grid container spacing={3} width={'100%'}>
          {productsData.data.map((product) => (
            <Grid
              item
              key={product.id}
              xs={12}
              sm={6}
              md={4}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ProductCard productInfo={product} key={product.id} />
            </Grid>
          ))}
        </Grid>
      )}
      {productsError && (
        <ErrorFallback errorMessage={getErrorMessage(productsError)} />
      )}
      {isFetching && <CircularProgress sx={{ margin: 0, padding: 5 }} />}
    </Stack>
  );
};

export default CatalogPage;
