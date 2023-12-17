import { IconButton, Stack, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useUpdateCartMutation } from '../../store/services/cartService';
import { Add, Remove } from '@mui/icons-material';
import {
  HttpStatus,
  getErrorMessage,
  isFetchBaseQueryError,
} from '../../types/apiTypes';
import { setUserLoggedOut } from '../../store/reducers/authSlice';
import { useDispatch } from 'react-redux';

type ChangeProductNumberInCartButtonsProps = {
  currentCount: number;
  productId: string;
  openErrorMessage: () => void;
  setErrorMessage: (message: string | undefined) => void;
};

const ChangeProductNumberInCartButtons: FC<
  ChangeProductNumberInCartButtonsProps
> = ({ currentCount, productId, openErrorMessage, setErrorMessage }) => {
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
    const needValidateFirstRequest = currentCount === 1 ? true : false;
    const updateResult = await updateCart({
      productId,
      count: 0,
      needValidate: needValidateFirstRequest,
    });
    if ('error' in updateResult) return;

    if (!needValidateFirstRequest) {
      await updateCart({
        productId,
        count: currentCount - 1,
        needValidate: true,
      });
    }
  };

  const handleAddProductClick = async () => {
    await updateCart({ productId, count: 1, needValidate: true });
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      gap="10px"
    >
      <IconButton size="large" onClick={handleRemoveProductClick}>
        <Remove color={'secondary'} />
      </IconButton>
      <Typography align="center">{currentCount}</Typography>
      <IconButton size="large" onClick={handleAddProductClick}>
        <Add color={'secondary'} />
      </IconButton>
    </Stack>
  );
};

export default ChangeProductNumberInCartButtons;
