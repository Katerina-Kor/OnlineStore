import { IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useUpdateCartMutation } from "../../store/services/cartService";
import { Add, Remove } from "@mui/icons-material";

type ProductCounterProps = {
  currentCount: number;
  productId: string;
}

const ChangeProductNumberInCartButtons: FC<ProductCounterProps> = ({currentCount, productId}) => {
  const [ updateCart ] = useUpdateCartMutation();

  const handleRemoveProductClick = async () => {
    const needValidateFirstRequest = currentCount === 1 ? true : false;
    await updateCart({productId, count: 0, needValidate: needValidateFirstRequest});
    if (!needValidateFirstRequest) {
      await updateCart({productId, count: currentCount - 1, needValidate: true});
    }
  }

  const handleAddProductClick = async () => {
    await updateCart({productId, count: 1, needValidate: true})
  }
  
  return (
    <Stack
      direction='row'
      justifyContent='center'
      alignItems='center'
      gap='10px'
    >
      <IconButton size="large" onClick={handleRemoveProductClick}>
        <Remove color={"secondary"} />
      </IconButton>
      <Typography align="center">{currentCount}</Typography>
      <IconButton size="large" onClick={handleAddProductClick}>
        <Add color={"secondary"} />
      </IconButton>
    </Stack>
  )
}

export default ChangeProductNumberInCartButtons;