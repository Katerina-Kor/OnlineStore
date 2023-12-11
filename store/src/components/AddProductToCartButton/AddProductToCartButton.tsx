import { Button } from "@mui/material";
import { FC } from "react";
import { useUpdateCartMutation } from "../../store/services/cartService";

type AddProductToCartButtonProps = {
  productId: string;
}

const AddProductToCartButton: FC<AddProductToCartButtonProps> = ({productId}) => {
  const [ updateCart ] = useUpdateCartMutation();

  return (
    <Button
      onClick={async () => await updateCart({productId, count: 1, needValidate: true})}
      variant="contained"
      type="button"
      sx={{ width: 'fit-content' }}
    >
      Add to cart
    </Button>
  )
}

export default AddProductToCartButton;