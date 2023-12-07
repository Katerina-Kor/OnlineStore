import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useUpdateCartMutation } from "../../../store/services/cartService";

type ProductCounterProps = {
  currentCount: number;
  productId: string;
}

const ProductCounter: FC<ProductCounterProps> = ({currentCount, productId}) => {
  const [ updateCart, updateCartResult ] = useUpdateCartMutation();
  
  return (
    <Stack
      direction='row'
      justifyContent='center'
      alignItems='center'
      gap='10px'
    >
      <Button
        onClick={async () => {
          const needValidateFirstRequest = currentCount === 1 ? true : false;
          await updateCart({productId, count: 0, needValidate: needValidateFirstRequest});
          if (!needValidateFirstRequest) {
            await updateCart({productId, count: currentCount - 1, needValidate: true});
          }
        }}
        variant='contained'
      >
        -
      </Button>
      <Typography>{currentCount}</Typography>
      <Button
        onClick={async () => await updateCart({productId, count: 1, needValidate: true})}
        variant='contained'
      >
        +
      </Button>
    </Stack>
  )
}

export default ProductCounter;