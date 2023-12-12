import { FC } from "react";
import { ProductsInfoInCart } from "../../types/apiTypes";
import { ImageListItem, Stack, Typography } from "@mui/material";
import noImage from '../../assets/img/no-image-icon-23485.png';
import ChangeProductNumberInCartButtons from "../ChangeProductNumberInCartButtons/ChangeProductNumberInCartButtons";
import RemoveProductButton from "../RemoveProductButton/RemoveProductButton";

type CartItemProps = {
  cartItem: ProductsInfoInCart;
}

const CartItem: FC<CartItemProps> = ({cartItem}) => {
  return (
    <Stack
      padding={1}
      spacing={1}
      direction='row'
      justifyContent={'start'}
      alignItems={'center'}
      sx={{ border: '1px solid gray', borderRadius: '5px' }}
    >
      <ImageListItem component={'div'} sx={{width: '100px', height: '100px'}}>
        <img
          src={noImage}
          alt='product image'
          loading="lazy"
        />
      </ImageListItem>
      <Stack flex={1}>
        <Typography variant="body1" textAlign={'center'}>
          {cartItem.product.title}
        </Typography>
        <Typography variant="body2" textAlign={'center'}>
          {cartItem.product.description}
        </Typography>
        <Typography variant="body1" textAlign={'center'}>
          {`$${cartItem.product.price} x ${cartItem.count} = $${cartItem.product.price * cartItem.count}`}
        </Typography>
        <Stack direction='row' justifyContent='space-evenly'>
          <ChangeProductNumberInCartButtons currentCount={cartItem.count} productId={cartItem.product.id} />
          <RemoveProductButton productId={cartItem.product.id} />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default CartItem;