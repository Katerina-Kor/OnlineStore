import { Button, CircularProgress } from '@mui/material';
import { FC, useEffect } from 'react';
import { useUpdateCartMutation } from '../../store/services/cartService';
import {
  HttpStatus,
  getErrorMessage,
  isFetchBaseQueryError,
} from '../../types/apiTypes';
import { useDispatch } from 'react-redux';
import { setUserLoggedOut } from '../../store/reducers/authSlice';

type AddProductToCartButtonProps = {
  productId: string;
  openErrorMessage: () => void;
  setErrorMessage: (message: string | undefined) => void;
};

const AddProductToCartButton: FC<AddProductToCartButtonProps> = ({
  productId,
  openErrorMessage,
  setErrorMessage,
}) => {
  const dispatch = useDispatch();
  const [updateCart, updateCartResult] = useUpdateCartMutation();

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

  return (
    <>
      <Button
        onClick={async () =>
          await updateCart({ productId, count: 1, needValidate: true })
        }
        variant="contained"
        type="button"
        sx={{ width: 135 }}
      >
        {updateCartResult.isLoading
          ? <CircularProgress color="inherit" size={25} />
          : 'Add to cart'
        }
      </Button>
    </>
  );
};

export default AddProductToCartButton;
