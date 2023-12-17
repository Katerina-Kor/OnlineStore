import { ImageListItem, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { getProductNumberInCart } from '../../utils/cartHelpers/cartHelpers';
import { ProductData } from '../../types/apiTypes';
import { useNavigate } from 'react-router-dom';
import { useGetCartQuery } from '../../store/services/cartService';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import noImage from '../../assets/img/no-image-icon-23485.png';
import AddProductToCartButton from '../AddProductToCartButton/AddProductToCartButton';
import ChangeProductNumberInCartButtons from '../ChangeProductNumberInCartButtons/ChangeProductNumberInCartButtons';
import RemoveProductButton from '../RemoveProductButton/RemoveProductButton';

type ProductCardProps = {
  productInfo: ProductData;
};

const ProductCard: FC<ProductCardProps> = ({ productInfo }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { data: cartData } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });

  const currentCount = cartData
    ? getProductNumberInCart(cartData.data.cart.items, productInfo.id)
    : 0;

  return (
    <Stack
      padding={1}
      spacing={1}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      sx={{ border: '1px solid gray', borderRadius: '5px' }}
      onClick={(event) => {
        if (event.target instanceof Element && event.target.closest('button'))
          return;
        navigate(`/products/${productInfo.id}`);
      }}
    >
      <ImageListItem component={'div'} sx={{ width: '250px', height: '250px' }}>
        <img src={noImage} alt="product image" loading="lazy" />
      </ImageListItem>
      <Typography variant="body1" textAlign={'center'}>
        {productInfo.title}
      </Typography>
      <Typography variant="body1" textAlign={'center'}>
        {`$${productInfo.price}`}
      </Typography>
      {currentCount === 0 ? (
        <AddProductToCartButton productId={productInfo.id} />
      ) : (
        <Stack direction="row" justifyContent="space-evenly" width={'100%'}>
          <ChangeProductNumberInCartButtons
            currentCount={currentCount}
            productId={productInfo.id}
          />
          <RemoveProductButton productId={productInfo.id} />
        </Stack>
      )}
    </Stack>
  );
};

export default ProductCard;
