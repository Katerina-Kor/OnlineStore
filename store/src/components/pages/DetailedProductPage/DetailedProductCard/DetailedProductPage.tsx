import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetCartQuery,
  useGetProductQuery,
} from '../../../../store/services/cartService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import LogoutFallback from '../../../fallbacks/LogoutFallback/LogoutFallback';
import ImageCarousel from '../../../ImageCarousel/ImageCarousel';
import { CircularProgress, Stack, Typography } from '@mui/material';
import AddProductToCartButton from '../../../buttons/AddProductToCartButton/AddProductToCartButton';
import ChangeProductNumberInCartButtons from '../../../buttons/ChangeProductNumberInCartButtons/ChangeProductNumberInCartButtons';
import RemoveProductButton from '../../../buttons/RemoveProductButton/RemoveProductButton';
import { getProductNumberInCart } from '../../../../utils/cartHelpers/cartHelpers';
import ErrorFallback from '../../../fallbacks/ErrorFallback/ErrorFallback';
import {
  HttpStatus,
  getErrorMessage,
  isFetchBaseQueryError,
} from '../../../../types/apiTypes';
import { setUserLoggedOut } from '../../../../store/reducers/authSlice';

const DetailedProductPage: FC = () => {
  const { productId = '' } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const {
    data: productData,
    error: productError,
    isFetching,
  } = useGetProductQuery(productId, {
    skip: !isLoggedIn,
  });
  const { data: cartData, error: cartError } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });

  const currentCount = cartData
    ? getProductNumberInCart(cartData.data.cart.items, productId)
    : 0;

  useEffect(() => {
    if (
      isFetchBaseQueryError(productError) &&
      productError.status === HttpStatus.UNAUTHORIZED
    ) {
      dispatch(setUserLoggedOut());
    }
  }, [productError]);

  useEffect(() => {
    if (!cartError) return;
    if (
      isFetchBaseQueryError(cartError) &&
      cartError.status === HttpStatus.UNAUTHORIZED
    ) {
      dispatch(setUserLoggedOut());
    }
  }, [cartError]);

  if (!isLoggedIn) {
    return <LogoutFallback isOpen />;
  }

  return (
    <Stack spacing={2} justifyContent={'center'}>
      <Typography
        component="h2"
        variant="h3"
        padding="20px"
        textAlign={'center'}
      >
        Product details
      </Typography>
      {productData && (
        <Stack direction={'row'}>
          <ImageCarousel />
          <Stack
            sx={{ flexGrow: 1 }}
            alignItems={'center'}
            justifyContent={'center'}
            padding={2}
            gap={1}
          >
            <Typography variant="h5" textAlign={'center'}>
              {productData?.data.title}
            </Typography>
            <Typography variant="body1" textAlign={'center'}>
              {productData?.data.description}
            </Typography>
            <Typography variant="h6" textAlign={'center'}>
              {`$${productData?.data.price}`}
            </Typography>
            {currentCount === 0 ? (
              <AddProductToCartButton productId={productId} />
            ) : (
              <Stack
                direction="row"
                justifyContent="space-evenly"
                width={'100%'}
              >
                <ChangeProductNumberInCartButtons
                  currentCount={currentCount}
                  productId={productId}
                />
                <RemoveProductButton productId={productId} />
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
      {productError && (
        <ErrorFallback errorMessage={getErrorMessage(productError)} />
      )}
      {isFetching && <CircularProgress sx={{ margin: 0, padding: 5 }} />}
    </Stack>
  );
};

export default DetailedProductPage;
