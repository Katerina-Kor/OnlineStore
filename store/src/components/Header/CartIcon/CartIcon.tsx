import { ShoppingCart } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type CartIconProps = {
  productsNumber: number;
};

const CartIcon: FC<CartIconProps> = ({ productsNumber }) => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate('/cart');
  };
  return (
    <Badge badgeContent={productsNumber} color="warning" max={99}>
      <IconButton sx={{ p: 0, position: 'relative' }} onClick={handleIconClick}>
        <ShoppingCart fontSize="large" color="primary" />
      </IconButton>
    </Badge>
  );
};

export default CartIcon;
