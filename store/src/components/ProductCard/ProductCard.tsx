import { Box, Button, ImageListItem, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { getProductNumberInCart } from "../../utils/cartHelpers/cartHelpers";
import { ProductData, ProductsInfoInCart } from "../../types/apiTypes";
import { useNavigate } from "react-router-dom";
import { useGetCartQuery, useUpdateCartMutation } from "../../store/services/cartService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProductCounter from "./ProductCounter/ProductCounter";
import noImage from '../../assets/img/no-image-icon-23485.png';

type ProductCardProps = {
  productInfo: ProductData;
  cartItems: ProductsInfoInCart[];
}

const ProductCard: FC<ProductCardProps> = ({productInfo, cartItems}) => {
  const navigate = useNavigate();
  const [ updateCart, updateCartResult ] = useUpdateCartMutation();
  const currentCount = getProductNumberInCart(cartItems, productInfo.id);
  
  return (
    <Stack
      padding={1}
      spacing={1}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ border: '1px solid gray', borderRadius: '5px' }}
      key={productInfo.id}
      onClick={(event) => {
        if (event.target instanceof HTMLButtonElement) return;
        navigate(`/products/${productInfo.id}`);
      }}
    >
      <ImageListItem component={'div'} sx={{width: '250px', height: '250px'}}>
        <img
          src={noImage}
          alt='product image'
          loading="lazy"
        />
      </ImageListItem>
      <Typography variant="body1" textAlign={'center'}>
        {productInfo.title}
      </Typography>
      <Typography variant="body1" textAlign={'center'}>
        {productInfo.price}
      </Typography>
      {currentCount === 0 ? (
        <Button
        onClick={async () => await updateCart({productId: productInfo.id, count: 1, needValidate: true})}
        variant="contained"
        type="button"
        sx={{ width: 'fit-content' }}
      >
        Add to card
      </Button>
      ) : (
        <ProductCounter currentCount={currentCount} productId={productInfo.id} />
      )}
    </Stack>
  )
}

export default ProductCard;