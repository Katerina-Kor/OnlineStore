import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const EmptyCartFallback: FC = () => {
  const navigate = useNavigate();
  return (
    <Stack gap={1} alignItems={'center'}>
      <Typography variant="h6" textAlign={'center'}>
        Cart is empty
      </Typography>
      <Typography variant="body1" textAlign="center">
        Visit catalog to select products
      </Typography>
      <Button
        role="link"
        size="large"
        variant="contained"
        onClick={() => navigate('/products')}
        sx={{ width: '80%' }}
      >
        go shopping
      </Button>
    </Stack>
  );
};

export default EmptyCartFallback;
