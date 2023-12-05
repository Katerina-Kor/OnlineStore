import { ShoppingCart } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";


const CartIcon: FC = () => {
  const navigate = useNavigate();
  const handleIconClick = () => {
    navigate('/cart');
  }
  return (
    <IconButton sx={{ p: 0 }} onClick={handleIconClick}>
      <ShoppingCart fontSize="large" color="primary" />
    </IconButton>
  );
}

export default CartIcon;