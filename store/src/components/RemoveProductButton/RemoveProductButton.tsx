import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FC } from 'react';
import { useUpdateCartMutation } from '../../store/services/cartService';

type RemoveProductButtonProps = {
  productId: string;
};

const RemoveProductButton: FC<RemoveProductButtonProps> = ({ productId }) => {
  const [updateCart] = useUpdateCartMutation();

  const handleRemoveProductClick = async () => {
    await updateCart({ productId, count: 0, needValidate: true });
  };

  return (
    <IconButton size="large" onClick={handleRemoveProductClick}>
      <Delete color="secondary" />
    </IconButton>
  );
};

export default RemoveProductButton;
