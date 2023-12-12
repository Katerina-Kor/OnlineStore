import { ShoppingCart } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
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
    <IconButton sx={{ p: 0, position: 'relative' }} onClick={handleIconClick}>
      <ShoppingCart fontSize="large" color="primary" />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '20px',
          height: '20px',
          background: 'rgba(128, 128, 128, 0.8)',
          borderRadius: '50%',
          position: 'absolute',
          top: 0,
          right: 0,
          display: 'flex',
        }}
      >
        <Typography fontSize="12px" align="center">
          {productsNumber}
        </Typography>
      </Box>
    </IconButton>
  );
};

export default CartIcon;
