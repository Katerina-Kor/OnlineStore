import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FC, useEffect } from 'react';
import { useUpdateCartMutation } from '../../store/services/cartService';
import { setUserLoggedOut } from '../../store/reducers/authSlice';
import { useDispatch } from 'react-redux';
import {
  HttpStatus,
  getErrorMessage,
  isFetchBaseQueryError,
} from '../../types/apiTypes';

type RemoveProductButtonProps = {
  productId: string;
  openErrorMessage: () => void;
  setErrorMessage: (message: string | undefined) => void;
};

const RemoveProductButton: FC<RemoveProductButtonProps> = ({
  productId,
  openErrorMessage,
  setErrorMessage,
}) => {
  const [updateCart, updateCartResult] = useUpdateCartMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!updateCartResult.error) return;
    if (
      isFetchBaseQueryError(updateCartResult.error) &&
      updateCartResult.error.status === HttpStatus.UNAUTHORIZED
    ) {
      dispatch(setUserLoggedOut());
    } else {
      openErrorMessage();
      setErrorMessage(getErrorMessage(updateCartResult.error));
    }
  }, [updateCartResult.error]);

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
