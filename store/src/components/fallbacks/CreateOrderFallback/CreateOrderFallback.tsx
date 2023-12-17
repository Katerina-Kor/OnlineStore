import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateOrderFallback: FC = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={2} alignItems={'center'}>
      <Typography textAlign={'center'} variant="h6" padding="20px">
        Thank you for your order! We will contact you soon.
      </Typography>
      <Button
        role="link"
        size="large"
        variant="contained"
        onClick={() => navigate('/products')}
        sx={{ width: '80%' }}
      >
        continue shopping
      </Button>
    </Stack>
  );
};

export default CreateOrderFallback;
