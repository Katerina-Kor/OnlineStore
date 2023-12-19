import { Button, CircularProgress } from '@mui/material';
import { FC, useEffect } from 'react';
import { useUpdateCartMutation } from '../../../store/services/cartService';
import {
  HttpStatus,
} from '../../../types/apiTypes';
import { useDispatch } from 'react-redux';
import { setUserLoggedOut } from '../../../store/reducers/authSlice';
import {
  setErrorMessage,
  setShowErrorAlert,
} from '../../../store/reducers/errorAlertSlice';
import { getErrorMessage, isFetchBaseQueryError } from '../../../utils/errorHelpers/errorHelpers';

type AddProductToCartButtonProps = {
  productId: string;
};

const AddProductToCartButton: FC<AddProductToCartButtonProps> = ({
  productId,
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
      dispatch(setShowErrorAlert());
      dispatch(setErrorMessage(getErrorMessage(updateCartResult.error)));
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
        {updateCartResult.isLoading ? (
          <CircularProgress color="inherit" size={25} />
        ) : (
          'Add to cart'
        )}
      </Button>
    </>
  );
};

export default AddProductToCartButton;
